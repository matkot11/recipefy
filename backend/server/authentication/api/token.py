from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from django.views.decorators.csrf import ensure_csrf_cookie
from drf_spectacular.utils import extend_schema


class CsrfTokenView(APIView):
    @extend_schema(
        summary="Set CSRF Token",
        description="Set the CSRF cookie on the frontend.",
        responses={200: {"detail": "CSRF cookie set"}},
    )
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        """
        Set the CSRF cookie on the frontend.
        """
        return Response({"detail": "CSRF cookie set"}, status=HTTP_200_OK)
