import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json()

    if (!process.env.DIFY_API_KEY) {
      console.error("❌ 缺少 DIFY_API_KEY")
      return NextResponse.json(
        { result: "❌ 伺服器未設定 API 金鑰，請聯繫系統管理員" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.dify.ai/v1/workflows/T5PajDgStcwpqrzk/run", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          uploaded_pdf: base64,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("❌ Dify 回傳錯誤：", data)
      return NextResponse.json(
        { result: "❌ Dify 分析失敗，請稍後再試。" },
        { status: 500 }
      )
    }

    if (!data.outputs?.evaluation_table) {
      console.warn("⚠️ Dify 回傳成功但無結果：", data)
      return NextResponse.json(
        { result: "⚠️ 分析完成，但未取得評分表格。" },
        { status: 200 }
      )
    }

    return NextResponse.json({ result: data.outputs.evaluation_table })
  } catch (error) {
    console.error("❌ 處理分析請求時出錯：", error)
    return NextResponse.json(
      { result: "❌ 伺服器處理發生錯誤，請稍後再試。" },
      { status: 500 }
    )
  }
}
