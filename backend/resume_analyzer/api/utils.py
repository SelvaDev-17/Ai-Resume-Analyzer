import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

def clean_text(text):
    """
    Simple text cleaning: remove special characters, lowercasing.
    """
    if not text:
        return ""
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text.lower()

def analyze_resume(resume_text, job_description_text):
    """
    Analyzes the resume against the job description using TF-IDF.
    Returns a dictionary with match score and keyword analysis.
    """
    clean_resume = clean_text(resume_text)
    clean_jd = clean_text(job_description_text)

    if not clean_resume or not clean_jd:
        return {
            "match_score": 0,
            "matched_keywords": [],
            "missing_keywords": [],
            "suggestions": "Insufficient text for analysis."
        }

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([clean_resume, clean_jd])
    
    # Cosine Similarity
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    match_score = round(cosine_sim[0][0] * 100, 2)

    # Keyword Extraction (Basic)
    # Get feature names (words)
    feature_names = vectorizer.get_feature_names_out()
    
    # Get vectors as arrays
    resume_vector = tfidf_matrix[0].toarray()[0]
    jd_vector = tfidf_matrix[1].toarray()[0]

    # create dictionary of word -> tfidf score
    resume_keywords = {feature_names[i]: resume_vector[i] for i in range(len(feature_names)) if resume_vector[i] > 0}
    jd_keywords = {feature_names[i]: jd_vector[i] for i in range(len(feature_names)) if jd_vector[i] > 0}

    # Identify matched and missing keywords based on presence in JD
    matched = []
    missing = []

    # specific important words from JD
    sorted_jd_keywords = sorted(jd_keywords.items(), key=lambda x: x[1], reverse=True)
    top_jd_words = [word for word, score in sorted_jd_keywords] # Consider top words

    for word in top_jd_words:
        if word in resume_keywords:
            matched.append(word)
        else:
            missing.append(word)

    # Limit lists for display
    matched_display = matched[:10] 
    missing_display = missing[:10]

    suggestions = ""
    if match_score < 50:
        suggestions = "Your resume has a low match. Consider adding more relevant keywords from the job description."
    elif match_score < 80:
        suggestions = "Good match! Try to incorporate some of the missing keywords to improve your score."
    else:
        suggestions = "Excellent match! Your resume is well-aligned with the job description."

    return {
        "match_score": match_score,
        "matched_keywords": matched_display,
        "missing_keywords": missing_display,
        "suggestions": suggestions
    }
