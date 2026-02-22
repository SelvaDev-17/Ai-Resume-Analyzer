from django.urls import path
from .views import register_user, upload_resume, list_resumes, protected_test, create_job_description, analyze_resume, CustomTokenObtainPairView, logout_user

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register_user),

    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('logout/', logout_user),

    path('protected/', protected_test),

    path('resume/upload/', upload_resume),
    path('resumes/', list_resumes),

    path('job-description/', create_job_description),
    path('analyze/', analyze_resume),
]
