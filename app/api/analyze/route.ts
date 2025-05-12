// /app/api/analyze/route.ts

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ result: "❌ 未提供檔案" }, { status: 400 })
    }

    // 檢查 API 金鑰
    const API_KEY = process.env.DIFY_API_KEY
    if (!API_KEY) {
      return NextResponse.json({ result: "❌ 缺少 DIFY_API_KEY" }, { status: 500 })
    }

    // 1️⃣ 上傳檔案到 Dify
    const uploadRes = await fetch("https://api.dify.ai/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      body: (() => {
        const uploadForm = new FormData()
        uploadForm.append("file", file)
        return uploadForm
      })(),
    })

    const uploadData = await uploadRes.json()
    if (!uploadRes.ok || !uploadData?.id) {
      console.error("❌ 檔案上傳失敗", uploadData)
      return NextResponse.json({ result: "❌ 檔案上傳至 Dify 失敗" }, { status: 500 })
    }

    // 2️⃣ 呼叫 Workflow 並傳入 file_id
    const wfRes = await fetch("https://api.dify.ai/v1/workflows/T5PajDgStcwpqrzk/run", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          uploaded_pdf: uploadData.id, // 傳入 file_id
        },
      }),
    })

    const wfData = await wfRes.json()
    if (!wfRes.ok || !wfData.outputs?.evaluation_table) {
      console.error("❌ Workflow 執行錯誤", wfData)
      return NextResponse.json({ result: "❌ Dify 回傳錯誤或沒有評分結果" }, { status: 500 })
    }

    // ✅ 回傳分析結果
    return NextResponse.json({ result: wfData.outputs.evaluation_table })
  } catch (error: any) {
    console.error("❌ 路由處理錯誤", error)
    return NextResponse.json(
      { result: `❌ 發生錯誤：${error.message || "未知錯誤"}` },
      { status: 500 }
    )
  }
}
