from django.contrib.auth.models import Group
from rest_framework.serializers import Serializer, ModelSerializer, CharField, IntegerField
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import User, Collection, Product

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class LoginSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)

class TokenSerializer(ModelSerializer):
   class Meta:
        model = Token
        fields = ['key']


class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'user_role']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            user_role=validated_data['user_role'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id' ,'name', 'price']

class CollectionSerializer(ModelSerializer):
    product = ProductSerializer()
    manager = UserSerializer()
    id = serializers.UUIDField(source='pk')
    count_for_buy = serializers.IntegerField(source='countForBuy')
    class Meta:
        model = Collection
        fields = ['id', 'product', 'manager', 'count_for_buy']

class ProfileSerializer(ModelSerializer):
    id = serializers.UUIDField(source='pk')
    class Meta:
        model = User
        fields = ['id', 'username', 'user_role']

class CreateProductSerializer(Serializer):
    name_product = CharField()
    price = IntegerField()

class CreateCollectionSerializer(Serializer):
    name_product = CharField()
    count_for_buy = IntegerField()