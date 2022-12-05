from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework import views
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from server.engine import serializers
from .models import User, Collection, Product

class IsClient(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.user_role == 'client')

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.user_role == 'manager')

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

class UserView(views.APIView):
    def get(self, request):
        return Response(serializers.UserSerializer(request.user).data)

class LoginView(views.APIView):
    def post(self, request: Request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                authenticated_user = User.objects.get(**serializer.validated_data)
            except:
                return Response(serializer.errors, status=400)
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

class CollectionsView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = Collection.objects.all()
        return Response(serializers.CollectionSerializer(qs, many=True).data)

class CollectionDetailView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        qs = Collection.objects.get(pk=pk)
        return Response(serializers.CollectionSerializer(qs).data)

class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        return Response(serializers.ProfileSerializer(request.user).data)

class UserProductsView(views.APIView):
    permission_classes = [IsManager]

    def get(self, request, pk):
        products = Product.objects.filter(manager=pk)
        return Response(serializers.ProductSerializer(products, many=True).data)

class UserCollectionsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        if user.user_role == 'client':
            collections = Collection.objects.filter(clients__username=user.username)
        else:
            collections = Collection.objects.filter(manager=user.id)
        return Response(serializers.CollectionSerializer(collections, many=True).data)

class CreateProduct(views.APIView):
    permission_classes = [IsManager]

    def post(self, request):
        serializer = serializers.CreateProductSerializer(data=request.data)
        if serializer.is_valid():
            product = Product.objects.create(
                name = serializer.validated_data['name_product'],
                price = serializer.validated_data['price'],
                manager_id= request.user.id)
            product.save()
            return Response(status=201)
        else:
            return Response(serializer.errors, status=400)

class CreateCollection(views.APIView):
    permission_classes = [IsManager]

    def post(self, request):
        serializer = serializers.CreateCollectionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                product = Product.objects.get(name=serializer.validated_data['name_product'])
            except:
                return Response(serializer.errors, status=400)
            collection = Collection.objects.create(
                product = product,
                manager = request.user,
                countForBuy = serializer.validated_data['count_for_buy'],
                status = True,
            )
            collection.save()
            return Response(status=201)
        else:
            return Response(serializer.errors, status=400)