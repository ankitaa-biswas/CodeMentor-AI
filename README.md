# CodeMentor AI (MVP)

A Chrome extension that provides AI-assisted code review for LeetCode submissions. This MVP uses an AI backend (OpenAI GPT-3.5 or mock AI) to analyze code and suggest improvements in correctness, style, and efficiency.

---

## Features

- Injects a **"Review My Code"** button on LeetCode problem pages.
- Sends submitted code to an AI backend for review.
- Displays AI feedback directly in a popup.
- Lightweight MVP for demonstration purposes.

---

## Tech Stack

- **Frontend:** Chrome Extension (JavaScript)
- **Backend:** Node.js + Express
- **AI:** OpenAI GPT-3.5 (or mock responses for free usage)
- **Storage:** Chrome `localStorage` for temporarily storing user code

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ankitaa-biswas/CodeMentor-AI.git
cd CodeMentor-AI
