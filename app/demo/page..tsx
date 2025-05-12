"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Upload, MessageSquare, BarChart } from "lucide-react"
import Link from "next/link"

export default function Demo() {
  const { t } = useLanguage()
  const [result, setResult] = useState("請上傳 ESG PDF 報告")

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return alert("請選擇 PDF 檔案")

    const base64 = await toBase64(file)
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64 }),
    })

    const json = await res.json()
    setResult(json.result || "⚠️ 無回傳結果")
  }

  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  const steps = [
    {
      id: 1,
      title: t("demo.step1.title"),
      description: t("demo.step1.description"),
      icon: <Upload className="h-12 w-12 text-green-600" />,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: t("demo.step2.title"),
      description: t("demo.step2.description"),
      icon: <MessageSquare className="h-12 w-12 text-green-600" />,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: t("demo.step3.title"),
      description: t("demo.step3.description"),
      icon: <BarChart className="h-12 w-12 text-green-600" />,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">{t("demo.hero.title")}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">{t("demo.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step) => (
              <div key={step.id} className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
                <div className={`${step.id % 2 === 0 ? "md:order-2" : ""}`}>
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-green-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className={`${step.id % 2 === 0 ? "md:order-1" : ""}`}>
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={`Demo Step ${step.id}`}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-green-800 mb-8">{t("demo.interactive.title")}</h2>

            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              className="mb-4 w-full border p-2 rounded-md"
            />

            <div className="prose bg-gray-50 p-4 rounded-md overflow-auto max-h-[500px]">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>

            <div className="mt-10">
              <iframe
                src="https://app.dify.ai/embed/chat?app_id=YOUR_CHATBOT_ID&share_code=YOUR_SHARE_CODE"
                width="100%"
                height="500"
                style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                title="SustainEval AI Chatbot"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">{t("demo.cta.title")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-green-100">{t("demo.cta.subtitle1")}</p>
          <p className="mt-4 max-w-2xl mx-auto text-green-100">{t("demo.cta.subtitle2")}</p>
          <div className="mt-8">
            <Link href="/contact">
              <Button className="bg-white text-green-700 hover:bg-green-50">
                {t("demo.cta.button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
