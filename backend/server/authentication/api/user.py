from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from drf_spectacular.utils import extend_schema


class UserView(APIView):
    @extend_schema(
        summary="Get user",
        description="Get user",
        responses={
            200: {"username": "string", "email": "string"},
            401: {"detail": "Not logged in"},
        },
    )
    def get(self, request):
        if request.user.is_authenticated:
            return Response(
                {"username": request.user.username, "email": request.user.email},
                status=HTTP_200_OK,
            )
        return Response({"detail": "Not logged in"}, status=HTTP_401_UNAUTHORIZED)
