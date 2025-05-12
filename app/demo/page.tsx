"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, MessageSquare, BarChart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { marked } from "marked"

export default function Demo() {
  const { t } = useLanguage()

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

  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePdfUpload = async (file: File) => {
    setError("")
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(",")[1]
        setLoading(true)

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64 }),
        })

        const data = await res.json()

        if (!res.ok || !data.evaluation_table) {
          throw new Error("分析失敗，請確認報告內容是否正確")
        }

        setResult(data.evaluation_table)
      } catch (err: any) {
        console.error("上傳錯誤：", err)
        setError(`分析過程發生錯誤，請稍後再試`)
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const retry = () => {
    if (file) {
      setResult("")
      setError("")
      handlePdfUpload(file)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">{t("demo.hero.title")}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">{t("demo.hero.subtitle")}</p>
        </div>
      </section>

      {/* Demo Steps Section */}
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
                    src={step.image}
                    alt={`Demo Step ${step.id}`}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-green-800 mb-8">
              Interactive Demo Experience
            </h2>

            <div className="mb-4">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const selected = e.target.files?.[0]
                  if (selected) {
                    setFile(selected)
                    setFileName(selected.name)
                    setResult("")
                    handlePdfUpload(selected)
                  }
                }}
              />
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">✅ 已選擇檔案：{fileName}</p>
              )}
            </div>

            {loading && (
              <p className="text-green-700 font-semibold mt-4">⏳ 分析中，請稍候…</p>
            )}

            {error && (
              <div className="mt-4 text-red-600 font-medium">
                ❌ {error}
                <div className="mt-2">
                  <Button variant="outline" onClick={retry}>
                    🔁 重新嘗試
                  </Button>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-8 p-6 border rounded bg-white whitespace-pre-wrap overflow-auto text-sm leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: marked(result) }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
