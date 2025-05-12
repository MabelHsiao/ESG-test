'use client'

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, MessageSquare, BarChart } from "lucide-react"
import Image from "next/image"

export default function Demo() {
  const { t } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) {
      setError(t("demo.error.noFile"))
      return
    }

    const formData = new FormData()
    formData.append("uploaded_pdf", file)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.error) {
        setError(t("demo.error.analysis") + "：" + data.error)
        setResult(null)
      } else {
        setResult(data.result || t("demo.result.none"))
        setError(null)
      }
    } catch (e) {
      setError(t("demo.error.uploadFailed"))
      setResult(null)
    }
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
      icon: <MessageSquare className="h-12 w-12 text-blue-600" />,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: t("demo.step3.title"),
      description: t("demo.step3.description"),
      icon: <BarChart className="h-12 w-12 text-purple-600" />,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <Card key={step.id}>
          <CardContent className="flex items-center space-x-4 py-8">
            {step.icon}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
            <Image src={step.image} alt={step.title} width={200} height={150} />
          </CardContent>
        </Card>
      ))}

      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const selected = e.target.files?.[0] || null
            setFile(selected)
            setError(null)
            setResult(null)
          }}
        />
        {file && (
          <p className="text-green-600">{t("demo.selectedFile")}：{file.name}</p>
        )}
        {error && (
          <p className="text-red-600">❌ {t("demo.error.analysis")}：{error}</p>
        )}
        {result && (
          <div className="bg-gray-100 p-4 rounded text-black whitespace-pre-wrap">
            {result}
          </div>
        )}
        <Button onClick={handleUpload}>{t("demo.button.upload")}</Button>
      </div>
    </div>
  )
}
