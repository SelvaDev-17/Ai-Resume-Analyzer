# AI Resume Analyzer - Project Portfolio Entry

## Project Title
**AI-Powered Resume Analyzer & Job Matcher**

## One-Liner
A full-stack web application that leverages Natural Language Processing (NLP) to score and analyze resumes against specific job descriptions, providing actionable feedback to candidates.

## Technical Stack
-   **Frontend**: React.js, Vite, CSS3 (Glassmorphism UI), Responsive Design
-   **Backend**: Python, Django REST Framework (DRF)
-   **AI/ML**: Scikit-Learn (TF-IDF, Cosine Similarity), NumPy
-   **Database**: MySQL
-   **Tools**: PDFPlumber (Text Extraction), Git/GitHub

## Key Features
-   **Intelligent Matching Algorithm**: Uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization and Cosine Similarity to calculate a precise percentage match between a resume and a job description.
-   **Keyword Analysis**: Automatically exacts and categorizes skills into "Matched" and "Missing" keywords, helping users optimize their resumes for Applicant Tracking Systems (ATS).
-   **PDF Parsing**: Robust text extraction from PDF resumes using `pdfplumber` to ensure accurate analysis of candidate data.
-   **Secure Authentication**: User registration and login system protected by JWT (JSON Web Tokens) Authentication.
-   **Responsive UI**: Modern, fully responsive interface with a "Glassmorphism" aesthetic, ensuring a seamless experience across desktop and mobile devices.

## What I Learned / Challenges Solved
-   Implemented a custom NLP pipeline to tokenize and vectorize text data for semantic comparison.
-   Solved CORS and proxy issues to enable secure communication between the React frontend and Django backend.
-   Designed a scalable database schema in MySQL to store user profiles, uploaded resumes, and historical analysis results.
-   Deployed the frontend to GitHub Pages using HashRouting to handle client-side routing limitations.
