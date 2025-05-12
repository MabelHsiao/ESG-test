import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { base64 } = await req.json()

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

  console.log("[📦 Dify 回應]", JSON.stringify(data, null, 2))

  return NextResponse.json({
    result:
      data.outputs?.evaluation_table ||
      data.outputs?.result ||
      "⚠️ 無回傳結果",
  })
}
