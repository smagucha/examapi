from django.urls import path
from . import views

urlpatterns = [
    path("add_student/", views.add_student),
    path("student_list/", views.student_list),
    path("student/<int:pk>/", views.student_detail),
    path("class/<str:name>/", views.student_class),
    path("class/<str:name>/<str:stream>/", views.student_class),
    path("add_stream/", views.add_stream),
    path("stream_list/", views.stream_list),
    path("stream/<int:pk>/", views.stream_detail),
    path("add_class/", views.add_class),
    path("all_classes/", views.all_class),
    path("class_detail/<int:pk>/", views.class_detail),
    path("attendance_detail/<int:pk>/", views.attendance_detail),
    path(
        "takeattendance/",
        views.take_attendance,
    ),
    path(
        "take_attendance/<str:name>/",
        views.record_attendance,
        name="record_attendance",
    ),
    path(
        "take_attendance_for_stream/<str:name>/<str:stream>/",
        views.record_attendance,
        name="record_attendance_stream",
    ),
    path("viewattendance/", views.viewattendance),
    path(
        "viewattendanceperstream/<str:name>/<str:stream>/",
        views.viewattendanceperstream,
        name="viewattendanceperstream",
    ),
    path(
        "viewattendanceperclass/<str:name>/",
        views.viewattendanceperstream,
        name="viewattendanceperclass",
    ),
]
