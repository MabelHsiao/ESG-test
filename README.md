# SustainEval Website

This is the full project codebase for the SustainEval AI website.  
It includes a demo page that allows users to upload ESG PDF reports, automatically analyze them via a Dify Workflow, and display results as a markdown evaluation table with an embedded ESG chatbot.

---

## 🌟 Features

- 🖼 Multilingual UI with Tailwind CSS and App Router structure
- 📤 Upload PDF ESG reports on `/demo` page
- 🤖 Auto-evaluate via Dify Workflow
- 🧠 Display results as markdown-formatted tables
- 💬 Integrated chatbot via iframe

---

## 📂 Folder Structure

```
app/
  ├─ demo/                   ← ESG Demo page (modified)
  ├─ api/analyze/           ← API route for Dify workflow
  ├─ features/, team/, etc. ← Original pages preserved
components/
.env.local                  ← Add your Dify API key here
package.json                ← Includes react-markdown
```

---

## ⚙️ Setup Instructions

### 1. Clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/sustaineval-website.git
cd sustaineval-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add `.env.local`

Create a `.env.local` file and insert:

```
DIFY_API_KEY=your_dify_key_here
```

### 4. Run the app locally

```bash
npm run dev
```

Visit: [http://localhost:3000/demo](http://localhost:3000/demo)

---

## 🚀 Deployment (Vercel)

1. Push this repo to GitHub  
2. Go to [vercel.com](https://vercel.com)
3. Select `New Project` → import from GitHub  
4. Add Environment Variable:

```
DIFY_API_KEY=your_dify_key_here
```

5. Click `Deploy`

---

## ✅ Notes

- Replace the `iframe` in `app/demo/page.tsx` with your actual Dify chatbot `app_id` and `share_code`
- Dify workflow ID is currently: `T5PajDgStcwpqrzk`

---

## 🧑‍💻 Author

Crafted by SustainEval AI team · 2024
