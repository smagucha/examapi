from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Designation, Teacher, Teachersubjects
from .serializers import (
    Designationserializer,
    Teacherserializer,
    Teachersubjectserializer,
)
from django.contrib.auth.models import User


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Teacher, Designation
from .serializers import Teacherserializer


# ✅ GET: fetch users + designations
@api_view(["GET"])
def teacher_form_data(request):
    teachers = User.objects.filter(groups__name="Teacher")
    titles = Designation.objects.all()

    data = {
        "teachers": [
            {
                "id": teacher.id,
                "full_name": f"{teacher.first_name} {teacher.last_name}",
            }
            for teacher in teachers
        ],
        "designations": [{"id": title.id, "title": title.title} for title in titles],
    }
    return Response(data)


# ✅ POST: add teacher
@api_view(["POST"])
def add_teacher(request):
    serializer = Teacherserializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Teacher added successfully", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    # 🚨 IMPORTANT: return errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def list_teacher(request):
    if request.method == "GET":
        teachers = Teacher.objects.all()
        data = [
            {
                "id": teacher.id,
                "full_name": f"{teacher.user}",
                "date_of_appointment": teacher.date_of_appointment,
                "Gender": teacher.gender,
                "Designation": str(teacher.designation),
            }
            for teacher in teachers
        ]
        return Response(data)


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
        serializer = Teachersubjectserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # {"teacher": 11, "Subject": 1, "class": 1, "stream": 3}


@api_view(["GET"])
def list_teachersubject(request):
    teachersubjects = Teachersubjects.objects.all()
    data = [
        {
            "id": teacher.id,
            "teacher": f"{teacher.teacher.user.first_name} {teacher.teacher.user.last_name}",
            "subject": str(teacher.Subject),
            "class": str(teacher.Class),
            "stream": str(teacher.stream),
        }
        for teacher in teachersubjects
    ]

    return Response(data)


@api_view(["GET", "PUT", "DELETE"])
def teachersubject_detail(request, pk):
    try:
        teachersubjects = Teachersubjects.objects.get(pk=pk)
    except Teachersubjects.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        data = {
            "id": teachersubjects.id,
            "teacher": f"{teachersubjects.teacher.user.first_name} {teachersubjects.teacher.user.last_name}",
            "teacherID": teachersubjects.teacher.id,
            "subject": str(teachersubjects.Subject),
            "subjectID": teachersubjects.Subject.id,
            "Class": str(teachersubjects.Class),
            "ClassID": teachersubjects.Class.id,
            "stream": str(teachersubjects.stream),
            "streamID": teachersubjects.stream.id,
        }
        return Response(data)

    elif request.method == "PUT":
        # Pass the existing instance and the new data to update it
        print(request.data)
        serializer = Teachersubjectserializer(teachersubjects, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # Fixed typo: 'serilaizer' changed to 'serializer'
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        teachersubjects.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def get_unregister_teacher(request):
    teacher = User.objects.filter(groups__name="Teacher")
    teacher = [
        {
            "teacher.id": teacher.id,
            "full_name": f"{teacher.first_name} {teacher.last_name}",
        }
        for teacher in teacher
    ]
    return Response(teacher)
