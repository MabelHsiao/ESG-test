"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, MapPin, Linkedin, Facebook, Github } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    needs: {
      trial: false,
      business: false,
      consultant: false,
      education: false,
      technical: false,
      other: false,
    },
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (need: string) => {
    setFormData({
      ...formData,
      needs: {
        ...formData.needs,
        [need]: !formData.needs[need as keyof typeof formData.needs],
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    alert("感謝您的訊息！我們將盡快回覆您。")
    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      needs: {
        trial: false,
        business: false,
        consultant: false,
        education: false,
        technical: false,
        other: false,
      },
      message: "",
    })
  }

  const needsOptions = [
    { id: "trial", label: t("contact.form.needs.trial") },
    { id: "business", label: t("contact.form.needs.business") },
    { id: "consultant", label: t("contact.form.needs.consultant") },
    { id: "education", label: t("contact.form.needs.education") },
    { id: "technical", label: t("contact.form.needs.technical") },
    { id: "other", label: t("contact.form.needs.other") },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">{t("contact.hero.title")}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                {t("contact.form.title")}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="company">{t("contact.form.company")}</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t("contact.form.needs")}</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {needsOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={formData.needs[option.id as keyof typeof formData.needs]}
                            onCheckedChange={() => handleCheckboxChange(option.id)}
                          />
                          <Label htmlFor={option.id} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
                    {t("contact.form.submit")}
                  </Button>
                </div>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                {t("contact.info.title")}
              </h2>
              <Card className="border-green-100">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">{t("contact.info.email.title")}</h3>
                    <p className="text-gray-700">sustaineval.ai.team@gmail.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">{t("contact.info.location.title")}</h3>
                    <p className="text-gray-700">{t("contact.info.location.address")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">{t("contact.info.social.title")}</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-gray-600 hover:text-green-700">
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-green-700">
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-green-700">
                        <Github className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-green-800 mt-8 mb-6">{t("contact.faq.title")}</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t("contact.faq.q1")}</h3>
                  <p className="text-gray-700">{t("contact.faq.a1")}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t("contact.faq.q2")}</h3>
                  <p className="text-gray-700">{t("contact.faq.a2")}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t("contact.faq.q3")}</h3>
                  <p className="text-gray-700">{t("contact.faq.a3")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
