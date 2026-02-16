from django.urls import path
from .views import register_user, upload_resume, list_resumes, protected_test, create_job_description, analyze_resume

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register_user),

    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),

    path('protected/', protected_test),

    path('resume/upload/', upload_resume),
    path('resumes/', list_resumes),

    path('job-description/', create_job_description),
    path('analyze/', analyze_resume),
]
