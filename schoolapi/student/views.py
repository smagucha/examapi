from .serializers import StudentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Student, Stream, Klass, Attendance
from .serializers import (
    StudentSerializer,
    StreamSerializer,
    KlassSerializer,
    AttendanceSerializer,
)


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
        serializer = KlassSerializer(stream, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        stream.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_stream(request):
    if request.method == "POST":
        serializer_class = StreamSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def stream_list(request):
    if request.method == "GET":
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
def take_attendance(request, name, stream=None):
    students = Student.student.get_student_list_class_or_stream(name, stream)

    if request.method == "POST":
        # Expecting a list of attendance records in request.data
        # Example JSON: [{"student_id": 1, "present_status": "P", "reason": ""}, ...]
        attendance_records = request.data

        created_count = 0
        for data in attendance_records:
            # Map student from your list or fetch if needed
            student = next((s for s in students if s.id == data["student_id"]), None)

            if student:
                Attendance.objects.create(
                    class_name_id=student.class_name.id,
                    student_id=student.id,
                    present_status=data.get("present_status"),
                    absentwhy=data.get("reason", ""),
                    stream=student.stream,
                )
                created_count += 1
        print(created_count)

        return Response(
            {"message": f"Successfully recorded {created_count} attendance entries."},
            status=status.HTTP_201_CREATED,
        )
    student_data = [
        {"id": s.student_id, "name": s.class_name, "stream": s.stream} for s in students
    ]
    return Response(student_data)


@api_view(["GET"])
def view_attendance_per_stream_or_class(request, name, stream=None):
    attend_queryset = Attendance.attend.get_student_list_stream(
        name=name, stream=stream
    )
    serializer = AttendanceSerializer(attend_queryset, many=True)
    return Response(
        {
            "title": "View Attendance",
            "stream": stream,
            "class": name,
            "attend": serializer.data,
        }
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


@api_view(["POST"])
def add_attend(request):
    if request.method == "POST":
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
