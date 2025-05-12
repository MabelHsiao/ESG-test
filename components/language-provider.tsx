"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    zh: "首頁",
  },
  "nav.features": {
    en: "Features",
    zh: "產品功能",
  },
  "nav.demo": {
    en: "Demo",
    zh: "展示",
  },
  "nav.plans": {
    en: "Plans",
    zh: "方案與合作",
  },
  "nav.team": {
    en: "Team",
    zh: "團隊與願景",
  },
  "nav.contact": {
    en: "Contact",
    zh: "聯絡我們",
  },

  // Home page
  "home.hero.title": {
    en: "Making ESG Evaluation Smarter and More Sustainable",
    zh: "讓 ESG 評核，更智慧也更永續",
  },
  "home.hero.subtitle": {
    en: "SustainEval AI is an intelligent ESG report evaluation platform powered by generative AI, helping companies automatically complete semantic mapping, paragraph evaluation, and grading based on TCSA, GRI, IFRS, and other standards, moving from reporting obligations to intelligent governance.",
    zh: "SustainEval AI 是一套結合生成式 AI 的 ESG 報告智慧評核平台，協助企業依據 TCSA、GRI、IFRS 等準則，自動完成語意對應、段落評語生成與分級評核，從填報義務邁向智慧治理。",
  },
  "home.challenges.title": {
    en: "Are You Facing These Challenges?",
    zh: "你是否也遇到這些挑戰？",
  },
  "home.challenges.1": {
    en: "Don't know how to write ESG reports, standards are too complex and difficult to interpret.",
    zh: "不知道怎麼寫 ESG 報告，準則太複雜，解讀吃力。",
  },
  "home.challenges.2": {
    en: "Vague scoring criteria, review work relies entirely on manual labor, high subjectivity and low efficiency.",
    zh: "評分標準模糊，審查作業全靠人工，主觀性高、效率低。",
  },
  "home.challenges.3": {
    en: "Small and medium-sized enterprises and educational institutions don't have enough resources to hire consulting teams.",
    zh: "中小企業與教育單位沒有足夠資源聘請顧問團隊。",
  },
  "home.solutions.title": {
    en: "SustainEval AI Brings You New Solutions",
    zh: "SustainEval AI 為你帶來全新解法",
  },
  "home.solutions.1": {
    en: "Built-in semantic understanding engine, automatically mapping to standards like TCSA",
    zh: "內建語意理解引擎，自動對應 TCSA 等準則",
  },
  "home.solutions.2": {
    en: "Automatic paragraph-level comment generation, precise and explainable",
    zh: "段落級評語自動生成，精準可解釋",
  },
  "home.solutions.3": {
    en: "Systematic grading feedback, high consistency in disclosure quality",
    zh: "系統化分級回饋，揭露品質一致性高",
  },
  "home.solutions.4": {
    en: "Support for API, modular deployment, flexible integration into various enterprise scenarios",
    zh: "支援 API、模組化部署、彈性導入各式企業場景",
  },
  "home.advantages.title": {
    en: "Our Advantages, Not Just Technology",
    zh: "我們的優勢，不只是技術",
  },
  "home.advantages.1": {
    en: "Rooted in local regulations, deeply integrated with Taiwan's TCSA regulations",
    zh: "根植本地規範，深度結合台灣 TCSA 法規",
  },
  "home.advantages.2": {
    en: "Using generative AI and RAG technology, precise semantic mapping and expandable",
    zh: "採用生成式 AI 與 RAG 技術，語意對應精準且可擴充",
  },
  "home.advantages.3": {
    en: "Possessing local corpus and patent application plans, creating technical barriers for ESG evaluation",
    zh: "擁有本地語料與專利申請計畫，打造 ESG 評核的技術門檻",
  },
  "home.advantages.4": {
    en: "Combining academic evidence and practical applications, helping enterprises quickly implement and improve governance",
    zh: "結合產學實證與實務應用，協助企業快速落地、改善治理",
  },
  "home.cta": {
    en: "Book a Demo Now",
    zh: "立即預約 Demo",
  },
  "home.cta.subtitle": {
    en: "Experience the future of ESG evaluation",
    zh: "體驗未來 ESG 評核的樣貌",
  },
  "home.cta.description": {
    en: "Click the button below to learn how SustainEval AI can help your ESG team save time, improve quality, and easily meet regulatory disclosure requirements.",
    zh: "點擊下方按鈕，了解 SustainEval AI 如何協助你的 ESG 團隊節省時間、提升品質、輕鬆應對法規揭露要求。",
  },

  // Features page
  "features.hero.title": {
    en: "Three Core Modules for Complete ESG Evaluation Process",
    zh: "三大核心模組，讓 ESG 評核流程一次到位",
  },
  "features.hero.subtitle": {
    en: "SustainEval AI is designed specifically for ESG report evaluation processes, combining generative AI and local regulatory understanding, from semantic mapping, comment generation to grading recommendations, fully automated and standardized, reducing human burden and improving disclosure quality.",
    zh: "SustainEval AI 專為 ESG 報告評核流程設計，結合生成式 AI 與在地法規理解力，從語意對應、評語生成到分級建議，全面自動化、標準化，降低人力負擔並提升揭露品質。",
  },
  "features.module1.title": {
    en: "TCSA Semantic Mapping Module",
    zh: "TCSA語意映射模組",
  },
  "features.module1.description": {
    en: "Automatically analyzes ESG report content and maps it to various TCSA disclosure guidelines, supporting multi-label classification and semantic deconstruction. No more manual comparison of provisions, helping users clarify whether each text covers key items, and quickly responding to review requirements and deficiency suggestions.",
    zh: "自動解析 ESG 報告內容並對應至 TCSA 各項揭露準則，支援多標籤分類與語意解構，不再需要人工比對條文，協助用戶釐清每段文字是否涵蓋關鍵項目，並能快速回應審查需求與缺漏建議。",
  },
  "features.module2.title": {
    en: "Paragraph-level Comment Generation Module",
    zh: "段落級評語生成模組",
  },
  "features.module2.description": {
    en: "Based on semantic understanding results, automatically produces readable and explainable paragraph comments, simulating the perspective of ESG professional reviewers, assisting in writing self-assessment and reinforcement suggestions, reducing writing time and communication costs, and improving report consistency and professionalism.",
    zh: "根據語意理解結果，自動產出具可讀性與可解釋性的段落評語，模擬 ESG 專業審查者的觀點，協助撰寫自評與補強建議，減少撰寫時間與溝通成本，提升報告的一致性與專業感。",
  },
  "features.module3.title": {
    en: "Standard-based Grading Evaluation Module",
    zh: "準則對應式分級評核模組",
  },
  "features.module3.description": {
    en: "Quantitative scoring based on disclosure level and content completeness, automatically presenting textual reasons and suggested supplementary directions. Users can immediately understand the strengths and weaknesses of different disclosure sections, serving as a basis for internal sustainability improvement and cross-departmental communication.",
    zh: "依據揭露程度與內容完整性進行量化評分，自動呈現文字理由與建議補充方向，使用者可即時了解不同揭露區段的強項與不足，作為企業內部永續改善與跨部門溝通的依據。",
  },
  "features.tech.title": {
    en: "Technology Core: Local Regulations × Semantic Understanding × AI Evaluation Engine",
    zh: "技術核心：本地法規 × 語意理解 × AI評核引擎",
  },
  "features.tech.description": {
    en: "SustainEval AI uses large language models combined with Retrieval-Augmented Generation (RAG) architecture, supporting horizontal expansion of TCSA/GRI/IFRS and other standards, and can be deployed as an enterprise solution or API integration according to customer needs, creating a continuously evolving ESG intelligent engine.",
    zh: "SustainEval AI 採用大型語言模型結合語意檢索增強生成（RAG）架構，支援 TCSA/GRI/IFRS 等規範橫向擴充，並可依客戶需求進行企業化部署或 API 整合，打造可持續進化的 ESG 智慧引擎。",
  },
  "features.vision.title": {
    en: "From Manual Operations to Intelligent Standards, From Compliance-Oriented to Sustainable Governance",
    zh: "從手動作業邁向智能標準，從合規導向邁向永續治理",
  },
  "features.vision.description": {
    en: "SustainEval AI is not just a tool, but a key partner in driving enterprises towards ESG intelligent transformation.",
    zh: "SustainEval AI 不只是工具，更是推動企業邁向ESG智慧轉型的關鍵夥伴。",
  },
  "features.tech1.title": {
    en: "Local Regulations",
    zh: "本地法規",
  },
  "features.tech1.description": {
    en: "Deeply integrated with Taiwan's TCSA regulations and international ESG standards",
    zh: "深度整合台灣 TCSA 法規與國際 ESG 標準",
  },
  "features.tech2.title": {
    en: "Semantic Understanding",
    zh: "語意理解",
  },
  "features.tech2.description": {
    en: "Using advanced natural language processing technology to analyze report content",
    zh: "採用先進的自然語言處理技術解析報告內容",
  },
  "features.tech3.title": {
    en: "AI Evaluation Engine",
    zh: "AI評核引擎",
  },
  "features.tech3.description": {
    en: "Intelligent scoring system combining large language models and RAG architecture",
    zh: "結合大型語言模型與 RAG 架構的智能評分系統",
  },
  "features.tech4.title": {
    en: "API Integration",
    zh: "API整合",
  },
  "features.tech4.description": {
    en: "Providing flexible API interfaces and enterprise system integration",
    zh: "提供靈活的 API 接口與企業系統整合",
  },

  // Demo page
  "demo.hero.title": {
    en: "Witness How SustainEval AI Automatically Completes ESG Evaluation",
    zh: "親眼見證 SustainEval AI 如何自動完成 ESG 評核",
  },
  "demo.hero.subtitle": {
    en: "We transform complex ESG writing and review processes into clear, intelligent operating interfaces. Simply upload or paste report paragraphs to instantly receive standard mapping, semantic analysis, comment suggestions, and quantitative scores.",
    zh: "我們將複雜的 ESG 撰寫與審查流程轉化為清晰、智慧的操作介面。只需上傳或貼入報告段落，即可即時獲得準則對應、語意分析、評語建議與量化分數。",
  },
  "demo.step1.title": {
    en: "Step 1 | Input ESG Paragraph Content",
    zh: "Step 1｜輸入 ESG 段落內容",
  },
  "demo.step1.description": {
    en: "Users can upload text paragraphs from their company's ESG report to the platform, supporting Traditional Chinese, Simplified Chinese, and English languages, automatically performing semantic analysis and format recognition, allowing quick start without relying on professional consultants.",
    zh: "使用者可將公司 ESG 報告中的文字段落上傳至平台，支援繁中、簡中、英文語言，自動進行語意解析與格式辨識，無需依靠專業顧問即可快速開始。",
  },
  "demo.step2.title": {
    en: "Step 2 | Semantic Mapping and Comment Generation",
    zh: "Step 2｜語意對應與評語生成",
  },
  "demo.step2.description": {
    en: "The system automatically analyzes semantics and matches relevant disclosure guidelines, such as TCSA A1-1, A3-3, etc., while generating a readable paragraph comment with actionable suggestions, helping companies write self-assessments and discover content gaps.",
    zh: "系統自動解析語意並比對相關揭露準則，例如 TCSA A1-1、A3-3 等，同時生成一段具可讀性與可操作建議的段落評語，幫助企業撰寫自評與發現內容缺口。",
  },
  "demo.step3.title": {
    en: "Step 3 | Standardized Scoring and Feedback Summary",
    zh: "Step 3｜標準化評分與回饋摘要",
  },
  "demo.step3.description": {
    en: "The platform will produce a 1-5 level quantitative score and text feedback summary based on the completeness and detail level of the paragraph's corresponding guidelines, and can summarize the overall score status and improvement suggestions of various guideline items in the enterprise dashboard.",
    zh: "平台會依據該段落對應準則的揭露完整性與細節程度，產出 1~5 級量化分數與文字回饋摘要，並可在企業儀表板中彙整各準則項目的整體得分概況與改善建議。",
  },
  "demo.interactive.title": {
    en: "Interactive Demo Experience",
    zh: "互動式 Demo 體驗",
  },
  "demo.input.title": {
    en: "Input ESG Report Paragraph",
    zh: "輸入 ESG 報告段落",
  },
  "demo.input.placeholder": {
    en: "Please paste your ESG report paragraph content...",
    zh: "請貼上您的 ESG 報告段落內容...",
  },
  "demo.result.title": {
    en: "AI Evaluation Results",
    zh: "AI 評核結果",
  },
  "demo.result.placeholder": {
    en: "Evaluation results will be displayed here...",
    zh: "評核結果將顯示在這裡...",
  },
  "demo.button.evaluate": {
    en: "Start Evaluation",
    zh: "開始評核",
  },
  "demo.cta.title": {
    en: "Experience the Demo Now to See How AI Reshapes Sustainable Evaluation Processes",
    zh: "立即體驗 Demo，了解 AI 如何重塑永續評核流程",
  },
  "demo.cta.subtitle1": {
    en: "We provide an online interactive demonstration version, and can also arrange one-on-one product tours and customized test scenarios, allowing you to personally experience the efficiency transformation from manual to intelligent.",
    zh: "我們提供線上互動示範版本，亦可安排一對一產品導覽與客製測試場景，讓您親自感受從人工到智慧的效率轉變。",
  },
  "demo.cta.subtitle2": {
    en: "Want to know what level your ESG report can achieve? We can help you score it.",
    zh: "想更深入了解您的 ESG 報告可達到什麼水準？我們可以幫您評分。",
  },
  "demo.cta.button": {
    en: "Book a Dedicated Demo",
    zh: "預約專屬 Demo",
  },

  // Plans page
  "plans.hero.title": {
    en: "Flexible Subscription × Consultant Value-Added × Licensing Cooperation",
    zh: "彈性訂閱 × 顧問加值 × 授權合作",
  },
  "plans.hero.subtitle": {
    en: "SustainEval AI adopts a SaaS tiered subscription model, providing the most suitable implementation solutions for small and medium enterprises, large enterprises, and consulting units, while also opening consultant cooperation, API authorization, and educational unit project cooperation, creating a scalable and expandable ESG intelligent evaluation platform.",
    zh: "SustainEval AI 採 SaaS 分級訂閱模式，提供中小企業、大型企業與顧問單位最合適的導入方案，同時開放顧問合作、API 授權與教育單位專案合作，打造可規模化、可擴充的 ESG 智慧評核平台。",
  },
  "plans.basic.name": {
    en: "Basic",
    zh: "Basic",
  },
  "plans.basic.price": {
    en: "NT$3,000",
    zh: "NT$3,000",
  },
  "plans.basic.period": {
    en: "/month",
    zh: "/月",
  },
  "plans.basic.description": {
    en: "Suitable for: Small and medium enterprises, sustainability courses",
    zh: "適用對象：中小企業、永續課程",
  },
  "plans.basic.feature1": {
    en: "TCSA guideline automatic mapping",
    zh: "TCSA 準則自動對映",
  },
  "plans.basic.feature2": {
    en: "Paragraph comment generation",
    zh: "段落評語生成",
  },
  "plans.basic.feature3": {
    en: "Single account login",
    zh: "單一帳號登入",
  },
  "plans.basic.feature4": {
    en: "Exportable PDF feedback summary",
    zh: "可匯出 PDF 回饋摘要",
  },
  "plans.basic.highlight": {
    en: "Low entry threshold, quickly verify the feasibility of sustainability disclosure quality and evaluation process",
    zh: "入門導入門檻低，快速驗證永續揭露品質與評核流程的可行性",
  },
  "plans.basic.button": {
    en: "Start Trial",
    zh: "開始試用",
  },
  "plans.pro.name": {
    en: "Pro",
    zh: "Pro",
  },
  "plans.pro.price": {
    en: "NT$8,000",
    zh: "NT$8,000",
  },
  "plans.pro.period": {
    en: "/month",
    zh: "/月",
  },
  "plans.pro.description": {
    en: "Suitable for: Large enterprises, ESG departments of consulting companies",
    zh: "適用對象：大型企業、顧問公司 ESG 部門",
  },
  "plans.pro.feature1": {
    en: "Multi-account management",
    zh: "多帳號管理",
  },
  "plans.pro.feature2": {
    en: "Evaluation comparison report",
    zh: "評核比較報告",
  },
  "plans.pro.feature3": {
    en: "Advanced analysis charts",
    zh: "進階分析圖表",
  },
  "plans.pro.feature4": {
    en: "API integration",
    zh: "API 整合",
  },
  "plans.pro.feature5": {
    en: "User permission management",
    zh: "用戶權限管理",
  },
  "plans.pro.highlight": {
    en: "Can collaborate on writing and reviewing reports, suitable for internal governance processes and customer ESG support services",
    zh: "可協作撰寫與審閱報告，適用於內部治理流程與客戶 ESG 支援服務",
  },
  "plans.pro.button": {
    en: "Choose Plan",
    zh: "選擇方案",
  },
  "plans.enterprise.name": {
    en: "Enterprise",
    zh: "Enterprise",
  },
  "plans.enterprise.price": {
    en: "NT$15,000",
    zh: "NT$15,000",
  },
  "plans.enterprise.period": {
    en: "/month",
    zh: "/月",
  },
  "plans.enterprise.description": {
    en: "Suitable for: Listed companies, multi-business group large organizations",
    zh: "適用對象：上市櫃公司、多事業群大型組織",
  },
  "plans.enterprise.feature1": {
    en: "Support for full set of guidelines (TCSA / GRI / IFRS)",
    zh: "支援全套準則包（TCSA / GRI / IFRS）",
  },
  "plans.enterprise.feature2": {
    en: "Custom dashboard",
    zh: "客製儀表板",
  },
  "plans.enterprise.feature3": {
    en: "SSO login integration",
    zh: "SSO 登入整合",
  },
  "plans.enterprise.feature4": {
    en: "Security encryption mechanism",
    zh: "安全加密機制",
  },
  "plans.enterprise.feature5": {
    en: "Dedicated consultant introduction and technical support",
    zh: "專屬顧問導入與技術支援",
  },
  "plans.enterprise.highlight": {
    en: "Create institutionalized ESG evaluation processes within the organization, meeting high disclosure obligations and governance responsibilities",
    zh: "打造組織內部 ESG 評核制度化流程，滿足高揭露義務與治理責任需求",
  },
  "plans.enterprise.button": {
    en: "Contact Sales",
    zh: "聯絡銷售",
  },
  "plans.partnership1.title": {
    en: "Consultant Cooperation and Authorization Model",
    zh: "顧問合作與授權模式",
  },
  "plans.partnership1.description": {
    en: "Providing consulting companies and firms with 60-day trials and revenue sharing models, helping consulting teams use our tools to review and suggest corporate client reports, accelerating service scale expansion. OEM API module integration authorization is also available, charging based on usage or number of accounts.",
    zh: "提供顧問公司與事務所 60 天試用及收益分潤模式，協助顧問團隊運用我們的工具對企業客戶報告進行審閱與建議，加速服務規模擴展。亦可提供 OEM API 模組整合授權，根據使用量或帳號數收取費用。",
  },
  "plans.partnership2.title": {
    en: "Educational Institutions and Industry-Academia Cooperation",
    zh: "教育單位與產學合作",
  },
  "plans.partnership2.description": {
    en: "Supporting colleges and universities to introduce system use in sustainability courses, providing educational authorization discounts, and can be combined with school industry-academia projects for ESG evaluation demonstrations and data accumulation, co-creating a new model for intelligent governance talent cultivation.",
    zh: "支援大專校院開設永續課程導入系統使用，提供教育授權優惠，並可搭配校內產學專案進行 ESG 評核示範與資料累積，共創智慧治理人才培育新模式。",
  },
  "plans.cta.title": {
    en: "Want to know which plan is best for you?",
    zh: "想知道哪個方案最適合您？",
  },
  "plans.cta.subtitle": {
    en: "Contact us and we will help you tailor the implementation process and trial method.",
    zh: "歡迎與我們聯繫，我們將協助您量身規劃導入流程與試用方式。",
  },
  "plans.cta.button": {
    en: "Contact Us",
    zh: "聯絡我們",
  },

  // Team page
  "team.hero.title": {
    en: "Technical Strength × Management Experience × ESG Expertise",
    zh: "技術實力 × 管理經驗 × ESG 專業",
  },
  "team.hero.subtitle": {
    en: "The SustainEval AI team combines generative AI technology, industrial engineering and management knowledge, and ESG evaluation field practical experience, committed to creating implementable, scalable, and reliable intelligent sustainability solutions. We don't just write programs and models, we understand the governance logic and regulatory requirements behind reports, and work hand in hand with academia and enterprises to promote new standards for ESG intelligence.",
    zh: "SustainEval AI 團隊結合生成式 AI 技術、工業工程與管理知識，以及 ESG 評核現場實務經驗，致力於打造能落地、可擴充、可信賴的智慧永續解決方案。我們不只寫程式與模型，我們理解報告背後的治理邏輯與法規需求，並與學界與企業攜手，推動 ESG 智慧化的新標準。",
  },
  "team.core.title": {
    en: "Core Team",
    zh: "核心團隊",
  },
  "team.member1.name": {
    en: "Hsiu-Hui Hsiao",
    zh: "蕭秀惠",
  },
  "team.member1.title": {
    en: "Chief Executive Officer (CEO)",
    zh: "執行長（CEO）",
  },
  "team.member1.description": {
    en: "Smart manufacturing PhD candidate with years of industry implementation experience and industrial consulting background, specializing in manufacturing automation, generative AI model design, and sustainable process optimization. Former TSMC CIT reviewer and best recruitment supervisor. Responsible for team strategy planning, technology roadmap, and external industry-academia cooperation coordination.",
    zh: "智慧製造博士候選人，具備多年產業導入經驗與工業顧問背景，專精於製造自動化、生成式 AI 模型設計與永續流程優化，曾任 TSMC CIT 評審與最佳招募主管。負責團隊策略規劃、技術路線與對外產學合作協調。",
  },
  "team.member2.name": {
    en: "Yuan Wang",
    zh: "王 元",
  },
  "team.member2.title": {
    en: "Chief Technology Officer (CTO)",
    zh: "技術長（CTO）",
  },
  "team.member2.description": {
    en: "Smart manufacturing master with AI model implementation and data engineering background, specializing in system module design, algorithm development, and ESG indicator construction. Leading semantic mapping module and RAG architecture development, and responsible for platform function realization and module integration.",
    zh: "智慧製造碩士，具備 AI 模型實作與資料工程背景，專長於系統模組設計、演算法開發與 ESG 指標建構。主導語意映射模組與 RAG 架構開發，並負責平台功能實現與模組整合。",
  },
  "team.member3.name": {
    en: "Yi-Jing Chiu",
    zh: "邱逸靜",
  },
  "team.member3.title": {
    en: "Chief Operating Officer (COO)",
    zh: "營運長（COO）",
  },
  "team.member3.description": {
    en: "Industrial management master, specializing in process design, SOP document writing, and ML pipeline construction, assisting in the standardization of ESG evaluation process and user operation experience design, and leading customer interface and educational promotion work.",
    zh: "工業管理碩士，專精於流程設計、SOP 文件撰寫與 ML pipeline 建構，協助導入 ESG 評核流程標準化與使用者操作體驗設計，並主導客戶介接與教育推廣工作。",
  },
  "team.advisors.title": {
    en: "Strategic Advisors",
    zh: "策略顧問群",
  },
  "team.advisor1.name": {
    en: "Prof. Kong-Cheng Wang",
    zh: "王孔政 教授",
  },
  "team.advisor1.title": {
    en: "Strategic Advisor",
    zh: "策略顧問",
  },
  "team.advisor1.description": {
    en: "Distinguished Professor at the Department of Industrial Management, National Taiwan University of Science and Technology, head of the Sustainable Technology Management Laboratory, specializing in sustainable governance, green operations, and integrated assessment of social responsibility.",
    zh: "國立台灣科技大學 工業管理所特聘教授，永續科技管理實驗室負責人，專長於永續治理、綠色作業與社會責任整合評估",
  },
  "team.advisor2.name": {
    en: "Prof. Tsai-Chi Kuo",
    zh: "郭財吉 教授",
  },
  "team.advisor2.title": {
    en: "Strategic Advisor",
    zh: "策略顧問",
  },
  "team.advisor2.description": {
    en: "Distinguished Professor at the Department of Industrial Management, National Taiwan University of Science and Technology, director of the Smart Operations Laboratory, with rich industry-academia practical experience and smart manufacturing transformation planning capabilities.",
    zh: "國立台灣科技大學 工業管理所特聘教授，智慧營運實驗室主持人，具備豐富產學實戰經驗與智慧製造轉型規劃能力",
  },
  "team.vision.title": {
    en: "Vision Statement | Creating a New Standard for ESG Intelligent Evaluation",
    zh: "願景宣言｜打造 ESG 智慧評核的新標準",
  },
  "team.vision.description": {
    en: "SustainEval AI is not just an AI tool, but an intelligent engine rooted in local regulations, built on generative technology, and aimed at sustainable governance. We believe that intelligence and standardization can truly transform sustainability reports from compliance to governance, from cost to competitiveness. The team is rooted in National Taiwan University of Science and Technology, combining academic energy, enterprise experience, and regulatory understanding, hoping to create the future sustainability ecosystem with more partners.",
    zh: "SustainEval AI 不只是 AI 工具，更是以本地法規為根、以生成式技術為骨、以永續治理為目標的智能引擎。我們相信智慧化與標準化能真正讓永續報告從應付變成治理，從成本變成競爭力。團隊根植於國立台灣科技大學，結合學術能量、企業經驗與法規理解，期望與更多夥伴共創未來的永續生態。",
  },

  // Contact page
  "contact.hero.title": {
    en: "Let Us Help You Start ESG Intelligent Evaluation Transformation",
    zh: "讓我們幫助您啟動 ESG 智慧評核轉型",
  },
  "contact.hero.subtitle": {
    en: "Whether you are an enterprise, consultant, educational institution, or policy promoter, we are happy to discuss the most suitable cooperation model and implementation plan with you. Please fill out the form below or contact us via email, and the SustainEval AI team will respond to you as soon as possible.",
    zh: "無論您是企業、顧問、教育單位或政策推動者，我們都樂於與您討論最適合的合作模式與導入方案。請填寫以下表單或透過電子郵件與我們聯繫，SustainEval AI 團隊將盡快回覆您。",
  },
  "contact.form.title": {
    en: "📮 Contact Form",
    zh: "📮 聯絡表單",
  },
  "contact.info.title": {
    en: "Contact Information",
    zh: "聯絡資訊",
  },
  "contact.info.email.title": {
    en: "📧 Contact Email",
    zh: "📧 聯絡信箱",
  },
  "contact.info.location.title": {
    en: "📍 Location",
    zh: "📍 所在地",
  },
  "contact.info.location.address": {
    en: "Smart Operations Management Laboratory, National Taiwan University of Science and Technology (No. 43, Keelung Rd., Sec. 4, Taipei, Taiwan)",
    zh: "國立台灣科技大學 智慧營運管理實驗室（台北市基隆路四段43號）",
  },
  "contact.info.social.title": {
    en: "🔗 Social Links",
    zh: "🔗 社群連結",
  },
  "contact.faq.title": {
    en: "FAQ Frequently Asked Questions",
    zh: "FAQ 常見問題",
  },
  "contact.faq.q1": {
    en: "Q: Do you support GRI or IFRS S2?",
    zh: "Q：是否支援 GRI 或 IFRS S2？",
  },
  "contact.faq.a1": {
    en: "A: Currently supports TCSA, GRI and IFRS S2 will be available in product 2.0.",
    zh: "A：目前已支援 TCSA，GRI 與 IFRS S2 將於產品 2.0 中開放。",
  },
  "contact.faq.q2": {
    en: "Q: Can I only implement part of the functionality?",
    zh: "Q：我可以只導入部分功能嗎？",
  },
  "contact.faq.a2": {
    en: "A: You can choose modules according to your needs, supporting API integration and flexible deployment.",
    zh: "A：可依需求選擇模組，支援 API 整合與彈性部署。",
  },
  "contact.faq.q3": {
    en: "Q: Is there an educational license version?",
    zh: "Q：有教育授權版本嗎？",
  },
  "contact.faq.a3": {
    en: "A: Yes, we provide special preferential authorization and technical support to educational institutions.",
    zh: "A：是，我們提供給教育單位特別優惠授權與技術支援。",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Function to translate text based on current language
  const t = (key: string): string => {
    if (!translations[key as keyof typeof translations]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key as keyof typeof translations][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
