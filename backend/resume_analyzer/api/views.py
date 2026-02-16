from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from django.contrib.auth.models import User

import pdfplumber

from .models import Resume, JobDescription, MatchResult
from .serializers import RegisterSerializer, ResumeSerializer, JobDescriptionSerializer, MatchResultSerializer
from .utils import analyze_resume as perform_analysis


# -------------------------
# REGISTER USER API
# -------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------
# PROTECTED TEST API
# -------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_test(request):
    return Response({
        "message": f"Hello {request.user.username}, you are authenticated!"
    })


# -------------------------
# UPLOAD RESUME API
# -------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_resume(request):

    if 'resume_file' not in request.FILES:
        return Response(
            {"error": "No resume_file provided"},
            status=status.HTTP_400_BAD_REQUEST
        )

    resume_file = request.FILES['resume_file']

    # Save resume file to database
    resume = Resume.objects.create(user=request.user, resume_file=resume_file)

    extracted_text = ""

    try:
        with pdfplumber.open(resume.resume_file.path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"

    except Exception as e:
        resume.delete()
        return Response(
            {"error": f"PDF extraction failed: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST
        )

    resume.extracted_text = extracted_text
    resume.save()

    serializer = ResumeSerializer(resume)

    return Response(
        {"message": "Resume uploaded successfully", "resume": serializer.data},
        status=status.HTTP_201_CREATED
    )


# -------------------------
# LIST RESUMES API
# -------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_resumes(request):
    resumes = Resume.objects.filter(user=request.user).order_by('-uploaded_at')
    serializer = ResumeSerializer(resumes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------------
# JOB DESCRIPTION API
# -------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_job_description(request):
    serializer = JobDescriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------
# ANALYZE RESUME API
# -------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyze_resume(request):
    resume_id = request.data.get('resume_id')
    job_desc_id = request.data.get('job_desc_id')

    if not resume_id or not job_desc_id:
        return Response(
            {"error": "resume_id and job_desc_id are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        resume = Resume.objects.get(id=resume_id, user=request.user)
        job_desc = JobDescription.objects.get(id=job_desc_id, user=request.user)

        # Perform analysis
        analysis_result = perform_analysis(resume.extracted_text, job_desc.description_text)

        # Save result
        match_result = MatchResult.objects.create(
            user=request.user,
            resume=resume,
            job=job_desc,
            match_score=analysis_result['match_score'],
            matched_skills=','.join(analysis_result['matched_keywords']),
            missing_skills=','.join(analysis_result['missing_keywords']),
            suggestions=analysis_result['suggestions']
        )

        serializer = MatchResultSerializer(match_result)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)
    except JobDescription.DoesNotExist:
        return Response({"error": "Job Description not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
