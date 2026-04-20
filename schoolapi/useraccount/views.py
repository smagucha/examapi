from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User


@api_view(["GET"])
def all_users(request):
    users = User.objects.all()

    context = [
        {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "Active": user.is_active,
            "last_login": user.last_login,
            "date_joined": user.date_joined,
        }
        for user in users
    ]
    print(type(context))
    return Response(context)


@api_view(["POST"])
def deactive_user(request, id):
    try:
        user = MyUser.objects.get(id=id)
    except User.DOESNOTEXIT:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # if request.method == "POST":
    #     user.is_active = False
    #     user.save()
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
