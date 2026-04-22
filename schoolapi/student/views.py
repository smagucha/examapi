from .serializers import StudentSerializer
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from rest_framework.decorators import api_view
from .models import Student, Stream, Klass, Attendance
from .serializers import (
    StreamSerializer,
    KlassSerializer,
    AttendanceSerializer,
    StudentSerializer,
)
from datetime import date, datetime
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


@api_view(["POST"])
def add_class(request):
    if request.method == "POST":
        serializer = KlassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def all_class(request):
    if request.method == "GET":
        klass = Klass.objects.all()
        serializer = KlassSerializer(klass, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def class_detail(request, pk):
    try:
        klass = Klass.objects.get(pk=pk)
    except Klass.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = KlassSerializer(klass)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = KlassSerializer(klass, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        klass.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_stream(request):
    if request.method == "POST":
        serializer = StreamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def stream_list(request):
    stream = Stream.objects.all()
    serializer = StreamSerializer(stream, many=True)
    return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def stream_detail(request, pk):
    try:
        stream = Stream.objects.get(pk=pk)
    except Stream.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = StreamSerializer(stream)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = StreamSerializer(stream, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        stream.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_student(request):
    if request.method == "POST":
        serializer_class = StudentSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def student_list(request):
    if request.method == "GET":
        students = Student.student.get_student_list()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def student_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def student_class(request, name, stream=None):
    students = Student.student.get_student_list_class_or_stream(
        name=name, stream=stream
    )
    serializer = StudentSerializer(students, many=True)
    context = {
        "title": "class students",
        "student": serializer.data,
    }

    if name:
        context["name"] = name
        all_streams = Stream.objects.all()
        context["allstream"] = StreamSerializer(all_streams, many=True).data

    return Response(context)


@api_view(["GET", "POST"])
def take_attendance(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_stream = request.data.get("selected_stream")
        if selected_stream:
            redirect_url = reverse(
                "record_attendance_stream",
                kwargs={"name": selected_class, "stream": selected_stream},
            )
        else:
            redirect_url = reverse("record_attendance", kwargs={"name": selected_class})
        return Response(redirect_url)

    data = {
        "classes": [str(c) for c in Klass.objects.all()],
        "streams": [str(s) for s in Stream.objects.all()],
    }
    return Response(data)


@api_view(["GET", "POST"])
def record_attendance(request, name, stream=None):
    students = Student.student.get_student_list_class_or_stream(name, stream)
    if request.method == "POST":
        attendance_records = request.data
        created_count = 0
        for data in attendance_records:
            student = next((s for s in students if s.id == data["student_id"]), None)
            if student:
                Attendance.objects.create(
                    class_name=student.class_name,
                    student=student,
                    present_status=data.get("present_status"),
                    absentwhy=data.get("reason", ""),
                    stream=student.stream if student.stream else None,
                )
            created_count += 1
        return Response(
            {"message": f"Successfully recorded {created_count} attendance entries."},
            status=status.HTTP_201_CREATED,
        )
    # GET request
    student_data = [
        {
            "student_id": s.id,
            "full_name": s.full_name,
            "class_name_id": s.class_name.id,
            "class_name": s.class_name.name if s.class_name else None,
            "stream_name": s.stream.name if s.stream else None,
            "stream_id": s.stream.id if s.stream else None,
        }
        for s in students
    ]
    if student_data:
        return Response(student_data)
    else:
        return Response(
            "No student to take attendance", status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET", "PUT", "DELETE"])
def attendance_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        attend = Attendance.objects.get(pk=pk)
    except Attendance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = AttendanceSerializer(attend)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = AttendanceSerializer(attend, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        attend.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def viewattendance(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_stream = request.data.get("selected_stream")
        if selected_stream:
            return Response(
                {
                    "redirect_url": reverse(
                        "viewattendanceperstream",
                        kwargs={"name": selected_class, "stream": selected_stream},
                    )
                }
            )
        else:
            return Response(
                {
                    "redirect_url": reverse(
                        "viewattendanceperclass", kwargs={"name": selected_class}
                    )
                }
            )
        # return Response(redirect_url)
    data = {
        "classes": [str(c) for c in Klass.objects.all()],
        "streams": [str(s) for s in Stream.objects.all()],
    }
    return Response(data)


@api_view(["GET"])
def viewattendanceperstream(request, name, stream=None):
    current_month = datetime.now().month
    attend = Attendance.attend.get_student_list_stream(name=name, stream=stream)
    serializer = AttendanceSerializer(attend, many=True)
    data = [
        {
            "first name": s.student.first_name,
            "last name": s.student.last_name,
            "class_name": s.class_name.name,
            "stream_name": s.stream.name if s.stream else None,
            "present_status": s.present_status,
            "absent_status": s.absentwhy,
            "todaydate": s.todaydate,
        }
        for s in attend
    ]
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_parents(request):
    parents_with_students = Student.student.get_student_list()
    context = [
        {
            "full_name": parents.parent,
            "phone_number": parents.parent_phone_number,
            "student": parents.full_name,
            "student_class": parents.class_name.name,
        }
        for parents in parents_with_students
    ]
    return Response(context)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_class(
    request,
    name,
    stream=None,
):
    students = Student.student.get_student_list_class_or_stream(
        name=name, stream=stream
    )
    context = [
        {
            "id": student.id,
            "full_name": student.full_name,
            "Adimision_number": student.Admin_no,
            "date_of_birth": student.date_of_birth,
            "Class": str(student.class_name),
            "stream": str(student.stream),
            "gender": student.gender,
        }
        for student in students
    ]
    return Response(context)
