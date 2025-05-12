"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, FileText, BarChart, Database, Award } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { t } = useLanguage()

  const challenges = [
    {
      id: 1,
      text: t("home.challenges.1"),
      icon: <FileText className="h-6 w-6 text-green-600" />,
    },
    {
      id: 2,
      text: t("home.challenges.2"),
      icon: <BarChart className="h-6 w-6 text-green-600" />,
    },
    {
      id: 3,
      text: t("home.challenges.3"),
      icon: <Database className="h-6 w-6 text-green-600" />,
    },
  ]

  const solutions = [
    {
      id: 1,
      text: t("home.solutions.1"),
    },
    {
      id: 2,
      text: t("home.solutions.2"),
    },
    {
      id: 3,
      text: t("home.solutions.3"),
    },
    {
      id: 4,
      text: t("home.solutions.4"),
    },
  ]

  const advantages = [
    {
      id: 1,
      text: t("home.advantages.1"),
    },
    {
      id: 2,
      text: t("home.advantages.2"),
    },
    {
      id: 3,
      text: t("home.advantages.3"),
    },
    {
      id: 4,
      text: t("home.advantages.4"),
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-green-800 sm:text-5xl md:text-6xl">
                {t("home.hero.title")}
              </h1>
              <p className="mt-6 text-lg text-gray-600">{t("home.hero.subtitle")}</p>
              <div className="mt-8">
                <Link href="/demo">
                  <Button className="bg-green-700 hover:bg-green-800">
                    {t("home.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="SustainEval AI Platform"
                className="rounded-lg shadow-xl"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t("home.challenges.title")}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{challenge.icon}</div>
                    <p className="text-gray-700">{challenge.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t("home.solutions.title")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solutions.map((solution) => (
              <div key={solution.id} className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">{solution.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t("home.advantages.title")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {advantages.map((advantage) => (
              <div key={advantage.id} className="flex items-start space-x-3 bg-green-50 p-6 rounded-lg">
                <Award className="h-6 w-6 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">{advantage.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">{t("home.cta")}</h2>
          <p className="mt-4 text-xl text-green-100">{t("home.cta.subtitle")}</p>
          <p className="mt-2 max-w-2xl mx-auto text-green-100">{t("home.cta.description")}</p>
          <div className="mt-8">
            <Link href="/demo">
              <Button className="bg-white text-green-700 hover:bg-green-50">
                {t("home.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
