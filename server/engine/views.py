from django.contrib.auth import authenticate
from django.contrib.auth.models import Group, User
from rest_framework import viewsets
from rest_framework import views
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from server.engine import serializers

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = [IsAuthenticated]


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def user(request: Request):
    return Response({
        'data': serializers.UserSerializer(request.user).data
    })


class LoginView(views.APIView):
    def post(self, request: Request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            authenticated_user = authenticate(**serializer.validated_data)
            try:
                token = Token.objects.get(user=authenticated_user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=authenticated_user)
            return Response(serializers.TokenSerializer(token).data)
        else:
            return Response(serializer.errors, status=400)

class RegisterView(views.APIView):
    def post(self, request):
        serializer = serializers.RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create(**serializer.validated_data)
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            return Response(serializers.TokenSerializer(token).data)
        else:
            return Response(serializer.errors, status=400)
