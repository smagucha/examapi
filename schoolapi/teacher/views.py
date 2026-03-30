from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Designation, Teacher, Teachersubjects
from .serializers import Designationserializer, Teacherserializer, subjectserializer


@api_view(["POST"])
def add_teacher(request):
    if request.method == "POST":
        serializer = Teacherserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def list_teacher(request):
    if request.method == "GET":
        teachers = Teacher.objects.all()
        serializer = Teacherserializer(teachers, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def teacher_detail(request, pk):
    try:
        teachers = Teacher.objects.get(pk=pk)
    except Teacher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = Teacherserializer(teachers)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = Teacherserializer(teachers, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serilaizer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        teachers.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_designation(request):
    if request.method == "POST":
        serializer = Designationserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def list_designation(request):
    if request.method == "GET":
        designations = Designation.objects.all()
        serializer = Designationserializer(designations, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def designation_detail(request, pk):
    try:
        designations = Designation.objects.get(pk=pk)
    except Designation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = Designationserializer(designations)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = Designationserializer(designations, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serilaizer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        designations.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_teachersubject(request):
    if request.method == "POST":
        serializer = subjectserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)


@api_view(["GET"])
def list_teachersubject(request):
    if request.method == "GET":
        teachersubjects = Teachersubjects.objects.all()
        serializer = subjectserializer(teachersubjects, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def teachersubject_detail(request, pk):
    try:
        teachersubjects = Teachersubjects.objects.get(pk=pk)
    except Teachersubjects.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = subjectserializer(teachersubjects)
        return Response(serializer.data)

    elif request.method == "PUT":
        # Pass the existing instance and the new data to update it
        serializer = subjectserializer(teachersubjects, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # Fixed typo: 'serilaizer' changed to 'serializer'
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        teachersubjects.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
