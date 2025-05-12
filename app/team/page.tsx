"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Award } from "lucide-react"

export default function Team() {
  const { t } = useLanguage()

  const teamMembers = [
    {
      name: t("team.member1.name"),
      title: t("team.member1.title"),
      description: t("team.member1.description"),
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: t("team.member2.name"),
      title: t("team.member2.title"),
      description: t("team.member2.description"),
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: t("team.member3.name"),
      title: t("team.member3.title"),
      description: t("team.member3.description"),
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const advisors = [
    {
      name: t("team.advisor1.name"),
      title: t("team.advisor1.title"),
      description: t("team.advisor1.description"),
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: t("team.advisor2.name"),
      title: t("team.advisor2.title"),
      description: t("team.advisor2.description"),
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">{t("team.hero.title")}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">{t("team.hero.subtitle")}</p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center">
            <Users className="mr-3 h-8 w-8 text-green-600" />
            {t("team.core.title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-green-100">
                <div className="flex justify-center pt-8">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="rounded-full w-32 h-32 object-cover"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-green-800">{member.name}</CardTitle>
                  <CardDescription className="text-gray-600 font-medium">{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center">
            <BookOpen className="mr-3 h-8 w-8 text-green-600" />
            {t("team.advisors.title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <Card key={index} className="border-green-100">
                <div className="flex items-center p-6">
                  <img
                    src={advisor.image || "/placeholder.svg"}
                    alt={advisor.name}
                    className="rounded-full w-20 h-20 object-cover mr-6"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-green-800">{advisor.name}</h3>
                    <p className="text-gray-500">{advisor.title}</p>
                    <p className="text-gray-600 mt-2 text-sm">{advisor.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center">
            <Award className="mr-3 h-8 w-8 text-green-600" />
            {t("team.vision.title")}
          </h2>
          <div className="max-w-3xl mx-auto bg-green-50 p-8 rounded-lg">
            <p className="text-gray-700 text-lg text-center">{t("team.vision.description")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
