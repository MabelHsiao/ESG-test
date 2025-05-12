import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json()

    if (!process.env.DIFY_API_KEY) {
      return NextResponse.json(
        { result: "❌ DIFY_API_KEY 環境變數未設定，請聯絡系統管理員" },
        { status: 500 }
      )
    }

    const res = await fetch("https://api.dify.ai/v1/workflows/T5PajDgStcwpqrzk/run", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: { uploaded_pdf: base64 },
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      // 顯示 Dify 回傳錯誤訊息
      return NextResponse.json(
        {
          result:
            data?.message || data?.error || "❌ Dify 回傳錯誤，請檢查 Workflow 是否設錯或 API Key 無效",
        },
        { status: 500 }
      )
    }

    if (!data.outputs?.evaluation_table) {
      return NextResponse.json(
        { result: "⚠️ 分析完成但未回傳 evaluation_table，請確認 prompt 輸出變數是否設為 evaluation_table" },
        { status: 200 }
      )
    }

    return NextResponse.json({ result: data.outputs.evaluation_table })
  } catch (err: any) {
    return NextResponse.json(
      {
        result: `❌ 伺服器處理錯誤：${err?.message || JSON.stringify(err)}`,
      },
      { status: 500 }
    )
  }
}
