import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("uploaded_pdf") as File

  if (!file) {
    return NextResponse.json({ error: "未收到檔案" }, { status: 400 })
  }

  const buffer = await file.arrayBuffer()
  const blob = new Blob([buffer], { type: file.type })
  const uploadForm = new FormData()
  uploadForm.append("uploaded_pdf", blob, file.name)

  const response = await fetch("https://udify.app/v1/workflows/T5PajDgStcwpqrzk/execute", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
    },
    body: uploadForm,
  })

  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    const html = await response.text()
    return NextResponse.json({ error: "Dify 回傳非 JSON：", html }, { status: 500 })
  }

  const data = await response.json()
  return NextResponse.json({ result: data.outputs?.text || "" })
}
