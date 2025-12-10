from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from drf_spectacular.utils import extend_schema
from django.contrib.auth.models import User


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField()
    password_confirmation = serializers.CharField()

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirmation"]:
            raise serializers.ValidationError({"detail": "Passwords do not match"})
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"detail": "Email already exists"})
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({"detail": "Username already exists"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class RegisterView(APIView):
    @extend_schema(
        summary="Register user",
        description="Register user",
        responses={
            200: {"detail": "User registered successfully"},
            400: {"detail": "Invalid data"},
        },
        request=RegisterSerializer,
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "User registered successfully"}, status=HTTP_200_OK
            )

        # Format errors: convert lists to strings for "detail" key
        errors = serializer.errors
        if (
            "detail" in errors
            and isinstance(errors["detail"], list)
            and len(errors["detail"]) > 0
        ):
            errors = {"detail": errors["detail"][0]}

        return Response(errors, status=HTTP_400_BAD_REQUEST)
