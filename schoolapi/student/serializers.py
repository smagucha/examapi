from rest_framework import serializers
from .models import Student, Stream, Klass, Attendance


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = "__all__"


class KlassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Klass
        fields = "__all__"


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"

    def validate(self, data):
        student = data.get("student")
        date = data.get("date", timezone.now().date())
        if Attendance.objects.filter(student=student, date=date).exists():
            raise serializers.ValidationError(
                "Attendance for this student has already been recorded today."
            )
        return data
