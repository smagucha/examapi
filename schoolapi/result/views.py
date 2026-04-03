from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.shortcuts import redirect
from student.models import Stream, Klass
from .models import term, subject, Mark, Grading, EnrollStudenttosubect
from .serializers import (
    Termserializer,
    Subjectserializer,
    MarkSerializer,
    GradeSerializer,
    EnrollStudenttosubectserializer,
)
from .utils import (
    get_student,
    all_terms,
    all_subjects,
    # generate_excel,
    # generate_pdf,
    class_stream_count,
    student_stream_class,
    student_subject_count,
    get_average_subject_marks,
    get_best_students_data,
    get_grades_count,
    calculate_class_rank,
    calculate_stream_rank,
    calculate_average_and_get_grades,
    get_all_student_result_for_class_and_stream,
    update_term_results,
    getgrade,
    get_grade,
    get_class,
    calculate_average,
    get_student_avg_and_class_average,
    get_student_result,
    subject_ranking_per_class_and_stream,
    get_students_by_class_and_stream,
    collect_student_marks,
    sort_results_by_total_marks,
    add_index_to_results,
    calculate_average_marks_and_grading,
    send_sms,
    get_stream,
)


@api_view(["POST"])
def add_subject(request):
    if request.method == "POST":
        serializer = Subjectserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


@api_view(["GET"])
def list_subjects(request):
    if request.method == "GET":
        subjects = subject.objects.all()
        serializer = Subjectserializer(subjects, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def detail_subject(request, pk):
    try:
        subjects = subject.objects.get(pk=pk)
    except subject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = Subjectserializer(subjects)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = Subjectserializer(subjects, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        subjects.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_term(request):
    if request.method == "POST":
        serializer = Termserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


@api_view(["GET"])
def list_term(request):
    terms = term.objects.all()
    serializer = Termserializer(terms, many=True)
    return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def detail_term(request, pk):
    try:
        term_obj = term.objects.get(pk=pk)
    except term.DoesNotExist:
        return Response({"error": "Term not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = Termserializer(term_obj)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = Termserializer(term_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        term_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def add_grade(request):
    if request.method == "POST":
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


@api_view(["GET"])
def list_grade(request):
    if request.method == "GET":
        grades = Grading.objects.all()
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def detail_grade(request, pk):
    try:
        grade_obj = Grading.objects.get(pk=pk)
    except Grading.DoesNotExist:
        return Response({"error": "Term not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = GradeSerializer(grade_obj)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = GradeSerializer(grade_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        grade_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def enroll_student_to_subject_all(request):
    allenroll = EnrollStudenttosubect.enroll.get_all_students_subject()
    serializer = EnrollStudenttosubectserializer(allenroll, many=True)
    return Response({"title": "allenrollsubject", "allenroll": serializer.data})


@api_view(["GET", "POST"])
def enroll_students_to_student(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_stream = request.data.get("selected_stream")
        redirect_url = reverse(
            "enrollstudentstosubject",
            kwargs={
                "name": selected_class,
                "stream": selected_stream,
            },
        )

        return Response({"redirect_url": redirect_url})
    data = {
        "classes": [str(c) for c in get_class()],
        "streams": [str(s) for s in get_stream()] if get_stream() else [],
    }

    return Response(data)


@api_view(["GET", "POST"])
def enroll_students_to_subject(request, name, stream=None):
    students = get_students_by_class_and_stream(name, stream)
    subjects_list = all_subjects()

    if request.method == "POST":
        # Check if request.data is a list (based on your input example)
        enrollment_data_list = request.data

        klass_obj = get_object_or_404(Klass, name=name)
        stream_obj = get_object_or_404(Stream, name=stream) if stream else None
        enrollment_count = 0

        # Iterate through the list of dictionaries sent in the request
        for entry in enrollment_data_list:
            try:
                # Use entry.get() because each item in your list is a dict
                EnrollStudenttosubect.objects.create(
                    student_id=entry.get("student_id"),
                    subject_id=entry.get("subject_id"),
                    class_name_id=klass_obj.id,
                    stream_id=stream_obj.id if stream_obj else None,
                )
                enrollment_count += 1
            except Exception as e:
                # Log error or skip bad entries
                continue

        return Response(
            {"message": f"Successfully enrolled {enrollment_count} students."},
            status=status.HTTP_201_CREATED,
        )
        # [{"student_id":2,"subject_id":3,"class_name_id":1, "stream_id":1},{"student_id":2,"subject_id":3,"class_name_id":1, "stream_id":1}]
    # GET logic remains the same
    data = {
        "students": [{"id": s.id, "name": str(s)} for s in students],
        "subjects": [{"id": sub.id, "name": sub.name} for sub in subjects_list],
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def select_class_subject_enrolled(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_stream = request.data.get("selected_stream")
        selected_subject = request.data.get("selected_subject")
        redirect_url = reverse(
            "studentenrolledsubjects",
            kwargs={
                "name": selected_class,
                "stream": selected_stream,
                "subject": selected_subject,
            },
        )

        return Response({"redirect_url": redirect_url})
    data = {
        "classes": [str(c) for c in get_class()],
        "streams": [str(s) for s in Stream.objects.all()],
        "subjects": [str(sub) for sub in all_subjects()],
    }

    return Response(data)


@api_view(["GET"])
def subjects_enrolled_by_student(request, name, subject, stream=None):
    queryset = EnrollStudenttosubect.objects.filter(
        class_name__name=name, subject__name=subject
    )
    if stream:
        queryset = queryset.filter(stream__name=stream)
    serializer = EnrollStudenttosubectserializer(queryset, many=True)
    return Response(
        {
            "class": name,
            "subject": subject,
            "stream": stream,
            "count": queryset.count(),
            "enrolled_students": serializer.data,
        }
    )


# {
#   "results": [
#     { "student_id": 12, "marks": 78 },
#     { "student_id": 15, "marks": 65 },
#     { "student_id": 18, "marks": 90 }
#   ]
# }


@api_view(["GET", "POST"])
def class_subject_ranking(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_term = request.data.get("selected_term")
        selected_subject = request.data.get("selected_subject")
        selected_stream = request.data.get("selected_stream")
        if selected_stream:
            redirect_url = reverse(
                "subjectperrankstreamterm",
                kwargs={
                    "name": selected_class,
                    "term": selected_term,
                    "subject": selected_subject,
                    "stream": selected_stream,
                },
            )

        redirect_url = reverse(
            "subjectperrankclass",
            kwargs={
                "name": selected_class,
                "term": selected_term,
                "subject": selected_subject,
            },
        )
        return Response({"redirect_url": redirect_url})
    data = {
        "classes": [str(c) for c in get_class()],
        "subjects": [str(s) for s in all_subjects()],
        "terms": [str(t) for t in all_terms()],
        "stream": [str(s) for s in get_stream()],
    }
    return Response(data)


@api_view(["GET"])
def subjectperrank(request, name, term, subject, stream=None):
    rankings_data = Mark.mark.student_subject_ranking_per_class_or_stream(
        name, term, subject, stream
    )
    data = {
        "name": name,
        "term": term,
        "stream": stream,
        "subject": subject,
        "rankings_data": rankings_data,
    }
    return Response(data)


@api_view(["GET", "POST"])
def result_for_stream_and_class(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_term = request.data.get("selected_term")
        selected_stream = request.data.get("selected_stream")
        if selected_stream:
            redirect_url = reverse(
                "resultstreamterm",
                kwargs={
                    "name": selected_class,
                    "stream": selected_stream,
                    "term": selected_term,
                },
            )
        else:
            redirect_url = reverse(
                "resultperterm",
                kwargs={
                    "name": selected_class,
                    "term": selected_term,
                },
            )

        return Response({"redirect_url": redirect_url})
    data = {
        "classes": [str(c) for c in get_class()],
        "terms": [str(t) for t in all_terms()],
        "stream": [str(s) for s in get_stream()],
    }
    return Response(data)


@api_view(["GET"])
def getresultstreamterm(request, name, term, stream=None):
    subjects = all_subjects()
    students = get_students_by_class_and_stream(name, stream)
    results = collect_student_marks(students, subjects, term)
    sorted_results = sort_results_by_total_marks(results)
    indexed_results = add_index_to_results(sorted_results)
    avg_marks = calculate_average_marks_and_grading(indexed_results, term)

    data = {
        "page_obj": indexed_results,
        "subject_list": [str(s) for s in all_subjects()],
        "class_name": name,
        "term": term,
    }
    return Response(data)


@api_view(["GET", "POST"])
def select_stream_for_subject_ranking(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_subject = request.data.get("selected_subject")
        selected_term = request.data.get("selected_term")

        redirect_url = reverse(
            "subjectrankingstream",
            kwargs={
                "class_name": "selected_class",
                "term": "selected_term",
                "subject": "selected_subject",
            },
        )
        return Response(redirect_url)
    data = {
        "classes": [str(c) for c in get_class()],
        "subjects": [str(s) for s in all_subjects()],
        "terms": [str(t) for t in all_terms()],
    }
    return Response(data)


@api_view(["GET"])
def class_stream_subject_ranking(request, class_name, term, subject):
    stream = Stream.objects.all()
    grades = getgrade()
    streamsubjectrank = {}
    for streams in stream:
        subjectclass = list(
            Mark.mark.get_subject_marks_for_class_or_stream(
                student_class_name=class_name,
                Term=term,
                subject_name=subject,
                stream=streams.name,
            )
        )
        studentpersubject = EnrollStudenttosubect.enroll.student_per_subject_count(
            subject=subject, class_name=class_name, stream=streams.name
        )
        if subjectclass:
            avg = sum(subjectclass) / studentpersubject
            streamsubjectrank[streams.name] = get_grade(grades, avg).points
    sorted_subject_ranking = dict(
        sorted(streamsubjectrank.items(), key=lambda item: item[1], reverse=True)
    )
    data = {
        "subject_ranking": sorted_subject_ranking,
        "subject": subject,
        "class": class_name,
    }
    return Response(data)


@api_view(["GET", "POST"])
def enter_result_for_stream_or_class(request):
    if request.method == "POST":
        selected_class = request.data.get("selected_class")
        selected_term = request.data.get("selected_term")
        selected_subject = request.data.get("selected_subject")
        selected_stream = request.data.get("selected_stream")
        if selected_stream:
            redirect_url = reverse(
                "enterexamforstream",
                kwargs={
                    "name": selected_class,
                    "stream": selected_stream,
                    "term": selected_term,
                    "Subject": selected_subject,
                },
            )
        else:
            redirect_url = reverse(
                "enterexamforclass",
                kwargs={
                    "name": selected_class,
                    "term": selected_term,
                    "Subject": selected_subject,
                },
            )
            # {"selected_class":"one","selected_stream":"red","selected_term":"first term","selected_subject":"math"}
        return Response({"redirect_url": redirect_url})
    data = {
        "classes": [str(c) for c in get_class()],
        "terms": [str(t) for t in all_terms()],
        "subjects": [str(s) for s in all_subjects()],
        "stream": [str(s) for s in get_stream()],
    }
    return Response(data)


@api_view(["GET", "POST"])
def enter_result(request, name, Term, Subject, stream=None):
    exam = EnrollStudenttosubect.enroll.get_students_subject(
        name=name, stream=stream, Subject=Subject
    )
    termid = term.objects.get(name=Term).id
    subjectid = subject.objects.get(name=Subject).id

    if request.method == "POST":
        getmarks = (
            request.data.getlist("subjectname")
            if hasattr(request.data, "getlist")
            else request.data.get("subjectname", [])
        )

        # Handle if getmarks is a single value or list
        if not isinstance(getmarks, list):
            getmarks = [getmarks]

        for i, v in enumerate(exam):
            Mark.objects.create(
                student=v.student,
                name_id=subjectid,
                Term_id=termid,
                marks=int(getmarks[i]),
            )
        return Response(
            {"message": "Marks created successfully"}, status=status.HTTP_201_CREATED
        )

    # GET request - return data as JSON
    context = {
        "exam": [
            {
                "student_id": student.student.id,
                "student_name": str(student.student),
                # Add other student fields as needed
            }
            for student in exam
        ],
        "name": name,
        "stream": stream,
        "term": Term,
        "subject": Subject,
    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_subjects(request):
    if request.method == "GET":
        Subject = subject.objects.all()
        serializer = Subjectserializer(Subject, many=True)
        return Response(serializer.data)
