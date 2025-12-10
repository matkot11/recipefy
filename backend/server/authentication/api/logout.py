from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from drf_spectacular.utils import extend_schema
from django.contrib.auth import logout


class LogoutView(APIView):
    @extend_schema(
        summary="Logout a user",
        description="Logout a user",
        responses={
            200: {"detail": "Logged out"},
            401: {"detail": "Not logged in"},
            500: {"detail": "Internal server error"},
        },
        request=None,
    )
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Not logged in"}, status=HTTP_401_UNAUTHORIZED)
        try:
            logout(request)
            return Response({"detail": "Logged out"}, status=HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)
