from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED,
)
from drf_spectacular.utils import extend_schema
from django.contrib.auth import authenticate, login


class LoginView(APIView):
    @extend_schema(
        summary="Login a user",
        description="Login a user",
        responses={
            200: {"detail": "User logged in"},
            401: {"detail": "Invalid email or password"},
            500: {"detail": "Internal server error"},
        },
        request=None,
    )
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"detail": "Invalid email address"},
                status=HTTP_401_UNAUTHORIZED,
            )

        user = authenticate(request, username=user.username, password=password)
        if user is not None:
            login(request, user)
            return Response(
                {
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "username": user.username,
                    }
                },
                status=HTTP_200_OK,
            )
        return Response(
            {"detail": "Invalid email or password"},
            status=HTTP_401_UNAUTHORIZED,
        )
