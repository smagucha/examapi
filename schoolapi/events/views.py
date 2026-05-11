from .serializers import EventsSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import SchoolEvents
from student.utils.permissions import allowed_groups
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@allowed_groups(["Admin", "Teacher"])
def add_event(request):
    if request.method == "POST":
        serializer_class = EventsSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@allowed_groups(["Admin", "Teacher", "Parent"])
def event_list(request):
    if request.method == "GET":
        event = SchoolEvents.objects.all()
        serializer = EventsSerializer(event, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
@allowed_groups(["Admin", "Teacher"])
def event_detail(request, pk):
    try:
        event = SchoolEvents.objects.get(pk=pk)
    except event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = EventsSerializer(event)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = EventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
