from django.db import models
from django.contrib.auth.models import Group
from student.models import Klass, Stream
from django.contrib.auth.models import User
from django.conf import settings
from result.models import subject


class Designation(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Teacher(models.Model):
    Gender = (
        ("Male", "Male"),
        ("Female", "Female"),
    )
    user = models.ForeignKey(
        User,
        limit_choices_to=({"groups__name": "Teacher"}),
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    date_of_appointment = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=6, choices=Gender, blank=True)
    designation = models.ForeignKey(
        Designation, on_delete=models.CASCADE, blank=True, null=True
    )
    # {"user": 6,"date_of_appointment": '2026-12-31', "designation": 6, "gender": 'Male'}


class Teachersubjects(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    Subject = models.ForeignKey(
        subject,
        on_delete=models.CASCADE,
    )
    Class = models.ForeignKey(Klass, on_delete=models.CASCADE)
    stream = models.ForeignKey(Stream, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name_plural = "teacher subjects"
