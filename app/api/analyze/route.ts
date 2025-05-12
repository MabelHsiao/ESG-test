export async function POST(req: Request) {
  try {
    const { base64, filename = "report.pdf" } = await req.json()

    const buffer = Buffer.from(base64, "base64")
    const form = new FormData()
    form.append("file", new Blob([buffer]), filename)

    const uploadRes = await fetch("https://api.dify.ai/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_API_KEY!}`,
      },
      body: form,
    })

    const { id: file_id } = await uploadRes.json()

    const runRes = await fetch("https://api.dify.ai/v1/workflows/T5PajDgStcwpqrzk/run", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: { uploaded_pdf: file_id } }),
    })

    const data = await runRes.json()

    if (!runRes.ok) {
      return NextResponse.json({ result: data.message || "Workflow 執行錯誤" }, { status: 500 })
    }

    return NextResponse.json({ result: data.outputs?.evaluation_table || "⚠️ 無回傳結果" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ result: `❌ 錯誤：${message}` }, { status: 500 })
  }
}
