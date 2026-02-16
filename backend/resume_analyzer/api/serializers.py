from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Resume

from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'resume_file', 'extracted_text', 'uploaded_at']
        read_only_fields = ['extracted_text', 'uploaded_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user


from .models import JobDescription, MatchResult

class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class MatchResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchResult
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'match_score', 'matched_skills', 'missing_skills', 'suggestions']
