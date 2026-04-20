from django.urls import path
from . import views

urlpatterns = [
    path("form-data/", views.teacher_form_data),
    path("add_teacher/", views.add_teacher),
    path("list_teacher/", views.list_teacher),
    path("teacher_detail/<int:pk>/", views.teacher_detail),
    path("add_designation/", views.add_designation),
    path("list_designation/", views.list_designation),
    path("designation_detail/<int:pk>/", views.designation_detail),
    path("add_teachersubject/", views.add_teachersubject),
    path("teachersubject_detail/<int:pk>/", views.teachersubject_detail),
    path("list_teachersubject/", views.list_teachersubject),
    path("get_unregister_teacher/", views.get_unregister_teacher),
]
