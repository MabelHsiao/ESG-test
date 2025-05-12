"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, BarChart3, Database, Code, Shield } from "lucide-react"

export default function Features() {
  const { t } = useLanguage()

  const modules = [
    {
      title: t("features.module1.title"),
      description: t("features.module1.description"),
      icon: <FileText className="h-12 w-12 text-green-600" />,
    },
    {
      title: t("features.module2.title"),
      description: t("features.module2.description"),
      icon: <MessageSquare className="h-12 w-12 text-green-600" />,
    },
    {
      title: t("features.module3.title"),
      description: t("features.module3.description"),
      icon: <BarChart3 className="h-12 w-12 text-green-600" />,
    },
  ]

  const technologies = [
    {
      title: t("features.tech1.title"),
      description: t("features.tech1.description"),
      icon: <Shield className="h-8 w-8 text-green-600" />,
    },
    {
      title: t("features.tech2.title"),
      description: t("features.tech2.description"),
      icon: <FileText className="h-8 w-8 text-green-600" />,
    },
    {
      title: t("features.tech3.title"),
      description: t("features.tech3.description"),
      icon: <Database className="h-8 w-8 text-green-600" />,
    },
    {
      title: t("features.tech4.title"),
      description: t("features.tech4.description"),
      icon: <Code className="h-8 w-8 text-green-600" />,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">{t("features.hero.title")}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">{t("features.hero.subtitle")}</p>
        </div>
      </section>

      {/* Core Modules Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {modules.map((module, index) => (
              <Card key={index} className="border-green-100 h-full">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="mb-4">{module.icon}</div>
                  <CardTitle className="text-xl text-green-800">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Core Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t("features.tech.title")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="mb-4">{tech.icon}</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">{tech.title}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-center text-gray-700">{t("features.tech.description")}</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">{t("features.vision.title")}</h2>
          <p className="text-xl max-w-3xl mx-auto">{t("features.vision.description")}</p>
        </div>
      </section>
    </div>
  )
}
