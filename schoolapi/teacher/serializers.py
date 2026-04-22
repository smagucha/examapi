from rest_framework import serializers
from .models import Designation, Teacher, Teachersubjects


class Designationserializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = "__all__"


class Teacherserializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = "__all__"  # user_name will be included automatically

    def get_user_name(self, obj):
        if obj.user:
            first = obj.user.first_name or ""
            last = obj.user.last_name or ""
            full_name = f"{first} {last}".strip()
            return full_name if full_name else obj.user.username
        return "Unknown"


class Teachersubjectserializer(serializers.ModelSerializer):
    class Meta:
        model = Teachersubjects
        fields = "__all__"
