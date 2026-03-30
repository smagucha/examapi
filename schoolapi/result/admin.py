from django.contrib import admin
from .models import term, subject, Mark, Grading, EnrollStudenttosubect

# Register your models here
admin.site.register(term)
admin.site.register(subject)
admin.site.register(Mark)
admin.site.register(EnrollStudenttosubect)
admin.site.register(Grading)
