"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"

const Footer = () => {
  const { t } = useLanguage()

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.features"), href: "/features" },
    { name: t("nav.demo"), href: "/demo" },
    { name: t("nav.plans"), href: "/plans" },
    { name: t("nav.team"), href: "/team" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">SustainEval AI</h3>
            <p className="mt-4 text-sm text-green-100">
              AI-powered ESG report evaluation platform for intelligent sustainability governance
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-green-100 hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-green-100">
              <li>sustaineval.ai.team@gmail.com</li>
              <li>National Taiwan University of Science and Technology</li>
              <li>No. 43, Keelung Rd., Sec. 4, Taipei, Taiwan</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-green-800 pt-8 text-center text-sm text-green-100">
          <p>&copy; {new Date().getFullYear()} SustainEval AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
