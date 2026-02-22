# AI Resume Analyzer

A full-stack application to analyze resumes against job descriptions using AI.

## Project Structure

- **frontend/**: React + Vite application (User Interface)
- **backend/**: Django REST Framework application (API Logic)

## How to Run Locally

You need to run **both** the frontend and backend terminals simultaneously.

### 1. Backend Setup (Django)

Open a terminal in VS Code and run:

```bash
# Navigate to backend folder
cd backend`

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Navigate to the project folder (Step most people miss!)
cd resume_analyzer

# Run the server
python manage.py runserver
```

The backend will start at: `http://127.0.0.1:8000/`

### 2. Frontend Setup (React)

Open a **second** terminal in VS Code (split terminal or new tab) and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Run the development server
npm run dev
```

The frontend will start at: `http://localhost:5173/` (or similar).

### 3. Access the App

Open your browser and go to the **Frontend URL** (e.g., `http://localhost:5173/`).
The frontend will communicate with the backend running on port 8000.
