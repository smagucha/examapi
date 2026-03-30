from rest_framework import serializers
from .models import term, subject, Mark, Grading, EnrollStudenttosubect


class Termserializer(serializers.ModelSerializer):
    class Meta:
        model = term
        fields = "__all__"


class Subjectserializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = "__all__"


class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = "__all__"


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grading
        fields = "__all__"


class EnrollStudenttosubectserializer(serializers.ModelSerializer):
    class Meta:
        model = EnrollStudenttosubect
        fields = "__all__"
