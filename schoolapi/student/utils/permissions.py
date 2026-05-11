from functools import wraps
from rest_framework.response import Response
from rest_framework import status


def allowed_groups(groups=[]):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if request.user.groups.filter(name__in=groups).exists():
                return view_func(request, *args, **kwargs)

            return Response(
                {"detail": "You are not allowed."}, status=status.HTTP_403_FORBIDDEN
            )

        return wrapper

    return decorator
