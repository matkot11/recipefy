from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from drf_spectacular.utils import extend_schema


class HelloSerializer(serializers.Serializer):
    message = serializers.CharField()


@extend_schema(
    summary="Hello World",
    description="This is a test endpoint to check if the API is working.",
    responses={200: HelloSerializer},
)
class HelloApi(APIView):
    serializer_class = HelloSerializer

    def get(self, request):
        serializer = HelloSerializer({"message": "Hello from Recipefy API!"})
        return Response(serializer.data)
