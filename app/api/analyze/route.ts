import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json()

    if (!process.env.DIFY_API_KEY) {
      console.error("❌ 缺少 DIFY_API_KEY")
      return NextResponse.json(
        { evaluation_table: "❌ 伺服器未設定 API 金鑰，請聯繫管理員" },
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
      console.error("❌ Dify API 錯誤回應：", data)
      return NextResponse.json(
        { evaluation_table: "❌ 無法完成分析，請稍後再試。" },
        { status: 500 }
      )
    }

    if (!data.outputs?.evaluation_table) {
      console.warn("⚠️ API 成功但無分析結果：", data)
      return NextResponse.json(
        { evaluation_table: "⚠️ 分析完成，但未產生評分表。" },
        { status: 200 }
      )
    }

    return NextResponse.json({
      evaluation_table: data.outputs.evaluation_table,
    })
  } catch (error) {
    console.error("❌ 路由處理發生錯誤：", error)
    return NextResponse.json(
      { evaluation_table: "❌ 系統錯誤，請稍後再試。" },
      { status: 500 }
    )
  }
}
