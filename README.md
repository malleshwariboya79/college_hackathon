# 📚 AI Academic Planner & Deadline Tracker

An intelligent academic planning system that helps students organize courses, track deadlines, detect scheduling conflicts, and automatically generate optimized AI-powered study plans.

Built for productivity, clarity, and smart workload management.

---

## 🚀 Problem Statement

Students manage multiple courses, assignments, and exams without a unified system.  
This project centralizes academic commitments and uses AI to transform deadlines into structured, conflict-free study schedules.

---

## ✨ Features

### Core Features
- 📚 Course Management (credits, timings, professor, venue)
- 📝 Assignment & Exam Deadline Tracker
- 📅 Weekly / Monthly Calendar View
- ⚡ Conflict Detection Engine
- 🆓 Free Slot Identification
- 📊 Workload Heatmap Visualization
- 🤖 AI Study Plan Generator


---

## 🧠 How It Works

### 1️⃣ Deterministic Scheduling Engine
The system:
- Detects overlapping time slots
- Identifies free study blocks
- Calculates workload intensity per day
- Assigns urgency scores to deadlines

### 2️⃣ AI-Powered Study Plan Generator
The AI engine:
- Analyzes deadlines and priorities
- Uses detected free time slots
- Distributes study sessions logically
- Avoids overloading specific days
- Maintains buffer time before deadlines

---

## 🏗️ Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- FullCalendar
- Chart.js / Recharts

### Backend
- Node.js (Express) / FastAPI
- PostgreSQL (via Supabase or direct setup)

### AI Integration
- Gemini API / OpenAI API
- Structured JSON response formatting

---

## 🗄️ Database Design Overview

Entities:
- Users
- Courses
- CourseSchedules
- Assignments
- Exams
- StudySessions

Key concepts:
- Time-based interval storage
- Conflict validation before insert
- Priority scoring system
- Free-slot gap detection algorithm

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/academic-planner.git

# Move into project folder
cd academic-planner

# Install dependencies
npm install
