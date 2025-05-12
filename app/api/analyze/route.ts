import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json()

    if (!process.env.DIFY_API_KEY) {
      return NextResponse.json({ result: "❌ DIFY_API_KEY 未設定" }, { status: 500 })
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

    if (!response.ok || !data.outputs?.evaluation_table) {
      console.error("❌ Dify 回應錯誤：", data)
      return NextResponse.json({ result: "❌ 分析失敗，請稍後再試" }, { status: 500 })
    }

    return NextResponse.json({ result: data.outputs.evaluation_table })
  } catch (error: any) {
    console.error("❌ 後端錯誤：", error)
    return NextResponse.json({ result: "❌ 系統錯誤，請稍後再試" }, { status: 500 })
  }
}
