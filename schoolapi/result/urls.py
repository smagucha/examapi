from django.urls import path
from . import views

urlpatterns = [
    path("add_subject/", views.add_subject),
    path("list_subjects/", views.list_subjects),
    path("detail_subject/<int:pk>/", views.detail_subject),
    path("add_term/", views.add_term),
    path("list_term/", views.list_term),
    path("detail_term/<int:pk>/", views.detail_term),
    path("add_grade/", views.add_grade),
    path("list_grade/", views.list_grade),
    path("detail_grade/<int:pk>/", views.detail_grade),
    path(
        "enroll_students_to_student/",
        views.enroll_students_to_student,
    ),
    path(
        "subjects_enrolled_by_student/<str:name>/<str:subject>/",
        views.subjects_enrolled_by_student,
    ),
    path("select_result_to_update/", views.select_result_to_update),
    path(
        "enrollstudentstosubject/<str:name>/<str:stream>/",
        views.enroll_students_to_subject,
        name="enrollstudentstosubject",
    ),
    path(
        "enrollstudentstosubjectclass/<str:name>/",
        views.enroll_students_to_subject,
        name="enrollstudentstosubjectclass",
    ),
    path("select_class_subject_enrolled/", views.select_class_subject_enrolled),
    path(
        "studentenrolledsubjects/<str:name>/<str:stream>/<str:subject>/",
        views.subjects_enrolled_by_student,
        name="studentenrolledsubjects",
    ),
    path(
        "studentenrolledsubjectsclass/<str:name>/<str:subject>/",
        views.subjects_enrolled_by_student,
        name="studentenrolledsubjectsclass",
    ),
    path("enroll_student_to_subject_all/", views.enroll_student_to_subject_all),
    path("enter_result_for_stream_or_class/", views.enter_result_for_stream_or_class),
    path(
        "enterexam/<str:name>/<str:stream>/<str:Term>/<str:Subject>/",
        views.enter_result,
        name="enterexamforstream",
    ),
    path(
        "enterexamforclass/<str:name>/<str:Term>/<str:Subject>/",
        views.enter_result,
        name="enterexamforclass",
    ),
    path(
        "classubjectranking/",
        views.class_subject_ranking,
        name="classubjectranking",
    ),
    path(
        "subjectperrankclass/<str:name>/<str:term>/<str:subject>/",
        views.subjectperrank,
        name="subjectperrankclass",
    ),
    path(
        "subjectperrankstreamterm/<str:name>/<str:stream>/<str:term>/<str:subject>/",
        views.subjectperrank,
        name="subjectperrankstreamterm",
    ),
    path("resultforstreamandclass/", views.result_for_stream_and_class),
    # path(
    #     "resultperclassterm/<str:name>/<str:term>/",
    #     views.getresultstreamterm,
    #     name="resultperterm",
    # ),
    # path(
    #     "resultstreamterm/<str:name>/<str:stream>/<str:term>/",
    #     views.getresultstreamterm,
    #     name="resultstreamterm",
    # ),
    path("selectstreamforsubjectranking/", views.select_stream_for_subject_ranking),
    path(
        "subjectrankingstream/<str:class_name>/<str:term>/<str:subject>/",
        views.class_stream_subject_ranking,
        name="subjectrankingstream",
    ),
    path("allsubjects", views.get_subjects),
    path(
        "subject_results_classtream/<str:class_name>/<str:term>/<str:subject>/<str:stream>/",
        views.subject_results_class,
        name="sujectresults",
    ),
    path(
        "subject_results_class/<str:class_name>/<str:term>/<str:subject>/",
        views.subject_results_class,
        name="sujectresultsclass",
    ),
    path("update_result/<int:pk>/", views.update_result),
    path("selectstreamorclassforresult/", views.result_stream_or_term),
    path(
        "resultperclassterm/<str:name>/<str:term>/",
        views.getresultstreamterm,
        name="resultperterm",
    ),
    path(
        "resultstreamterm/<str:name>/<str:stream>/<str:term>/",
        views.getresultstreamterm,
        name="resultstreamterm",
    ),
]
