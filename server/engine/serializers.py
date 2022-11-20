from django.contrib.auth.models import Group
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class IssueTokenRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)

class TokenSerializer(ModelSerializer):
   class Meta:
        model = Token
        fields = ['key']
