from rest_framework import serializers
from .models import Designation, Teacher, Teachersubjects


class Designationserializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = "__all__"


class Teacherserializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"


class Teachersubjectserializer(serializers.ModelSerializer):
    class Meta:
        model = Teachersubjects
        fields = "__all__"
