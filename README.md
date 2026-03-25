# AI Carrer Copilot

<p align="center">
	<img src="./public/logo.svg" alt="AI Carrer Copilot Logo" width="120" height="120" />
</p>

<p align="center">
	AI-powered resume and job-description analyzer that gives clear gap insights, priority skills, and a practical learning plan.
</p>

<p align="center">
	<a href="https://www.linkedin.com/in/maajidali03">LinkedIn</a> •
	<a href="https://github.com/Maajid3">Github</a> •
	<a href="mailto:maajidali00003@gmail.com">mail me</a> •
	<a href="https://maajidali.tech">Portfolio</a>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/React-19-0b1020?style=for-the-badge&logo=react&logoColor=61dafb" alt="React 19" />
	<img src="https://img.shields.io/badge/Vite-8-0b1020?style=for-the-badge&logo=vite&logoColor=f6c945" alt="Vite 8" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-v4-0b1020?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8" alt="Tailwind v4" />
	<img src="https://img.shields.io/badge/Supabase-Auth-0b1020?style=for-the-badge&logo=supabase&logoColor=3ecf8e" alt="Supabase Auth" />
	<img src="https://img.shields.io/badge/Google-0b1020?style=for-the-badge&logo=google" alt="google" />
</p>

---

## Why This App

Finding where your resume misses a target role is time-consuming. AI Carrer Copilot helps you do it in minutes:

- Upload your resume PDF or add skills and paste a job description.
- Get AI analysis of alignment and missing skills.
- See a focused priority list and a step-by-step learning plan.
- Save and revisit previous analyses with chat history.

## Core Features

- Resume upload (PDF) with drag-and-drop support.
- Also can add skills manually.
- Job description input for tailored role analysis.
- AI output sections:
  - Analysis summary
  - Priority skills to learn
  - Learning plan with actionable steps
- Google login via Supabase OAuth.
- Chat history page for previous analyses.
- Detailed chat view with:
  - Resume summary
  - Target job summary
  - Job skills vs resume skills vs missing skills
- Responsive, glassmorphism-inspired UI with animated orb background.

## App Flow

<details>
	<summary><strong>Click to expand user flow</strong></summary>

1. User signs in with Google.
2. User uploads a resume PDF or add skills and adds job description.
3. Frontend sends data to `analyzer`.
4. User receives AI analysis + learning plan + priority skills.
5. User can open `Chats` to revisit previous analyses.
6. User can open a detailed chat to inspect skill gaps deeply.

</details>

## Notes

- Resume file input currently accepts PDF files.
- App has a usage-limit warning only two `analysis` per user.
- Auth state is synced using Supabase auth listener and React Query cache.

## Roadmap Ideas

- Add score visualization (match percentage).
- Export analysis to PDF.
- Add filters/search for chat history.
- Add unit tests and integration tests.
- Add chat continue section

## License

🪪 MIT Licence


<p>If you find any bug or issue contact me on these sites</p>

<p>
	<a href="https://www.linkedin.com/in/maajidali03">LinkedIn</a> •
	<a href="https://github.com/Maajid3">Github</a> •
	<a href="mailto:maajidali00003@gmail.com">mail me</a> •
	<a href="https://maajidali.tech">Portfolio</a>
</p>