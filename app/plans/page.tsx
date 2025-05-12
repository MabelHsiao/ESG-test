"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Plans() {
  const { t } = useLanguage()

  const plans = [
    {
      name: t("plans.basic.name"),
      price: t("plans.basic.price"),
      period: t("plans.basic.period"),
      description: t("plans.basic.description"),
      features: [
        t("plans.basic.feature1"),
        t("plans.basic.feature2"),
        t("plans.basic.feature3"),
        t("plans.basic.feature4"),
      ],
      highlight: t("plans.basic.highlight"),
      buttonText: t("plans.basic.button"),
      buttonVariant: "outline",
    },
    {
      name: t("plans.pro.name"),
      price: t("plans.pro.price"),
      period: t("plans.pro.period"),
      description: t("plans.pro.description"),
      features: [
        t("plans.pro.feature1"),
        t("plans.pro.feature2"),
        t("plans.pro.feature3"),
        t("plans.pro.feature4"),
        t("plans.pro.feature5"),
      ],
      highlight: t("plans.pro.highlight"),
      buttonText: t("plans.pro.button"),
      buttonVariant: "default",
      featured: true,
    },
    {
      name: t("plans.enterprise.name"),
      price: t("plans.enterprise.price"),
      period: t("plans.enterprise.period"),
      description: t("plans.enterprise.description"),
      features: [
        t("plans.enterprise.feature1"),
        t("plans.enterprise.feature2"),
        t("plans.enterprise.feature3"),
        t("plans.enterprise.feature4"),
        t("plans.enterprise.feature5"),
      ],
      highlight: t("plans.enterprise.highlight"),
      buttonText: t("plans.enterprise.button"),
      buttonVariant: "outline",
    },
  ]

  const partnerships = [
    {
      title: t("plans.partnership1.title"),
      description: t("plans.partnership1.description"),
    },
    {
      title: t("plans.partnership2.title"),
      description: t("plans.partnership2.description"),
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">{t("plans.hero.title")}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">{t("plans.hero.subtitle")}</p>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`${plan.featured ? "border-green-500 shadow-lg relative" : "border-gray-200"}`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                    推薦
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="ml-1 text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-md">
                    <p className="text-sm text-gray-700">{plan.highlight}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/contact" className="w-full">
                    <Button
                      className={`w-full ${
                        plan.buttonVariant === "default"
                          ? "bg-green-700 hover:bg-green-800"
                          : "border-green-700 text-green-700 hover:bg-green-50"
                      }`}
                      variant={plan.buttonVariant as "default" | "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">{partnership.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{partnership.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">{t("plans.cta.title")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-green-100">{t("plans.cta.subtitle")}</p>
          <div className="mt-8">
            <Link href="/contact">
              <Button className="bg-white text-green-700 hover:bg-green-50">
                {t("plans.cta.button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
