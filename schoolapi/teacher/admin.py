from django.contrib import admin
from .models import Designation, Teacher, Teachersubjects

# Register your models here.
admin.site.register(Designation)
admin.site.register(Teacher)
admin.site.register(Teachersubjects)
