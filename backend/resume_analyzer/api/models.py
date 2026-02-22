from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume_file = models.FileField(upload_to="resumes/")
    extracted_text = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Resume"


class JobDescription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class MatchResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    job = models.ForeignKey(JobDescription, on_delete=models.CASCADE)

    match_score = models.FloatField(default=0)
    matched_skills = models.TextField(blank=True, null=True)
    missing_skills = models.TextField(blank=True, null=True)
    suggestions = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.match_score}%"

class UserLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    email = models.EmailField()
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.username} - {self.login_time}"
