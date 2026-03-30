from rest_framework import serializers
from .models import SchoolEvents


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolEvents
        fields = "__all__"
