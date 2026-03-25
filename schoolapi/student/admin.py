from django.contrib import admin
from .models import Klass, Stream, Student, Attendance

# Register your models here.

admin.site.register(Klass)
admin.site.register(Stream)
admin.site.register(Student)
admin.site.register(Attendance)
