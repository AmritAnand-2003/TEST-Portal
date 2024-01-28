from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import  viewsets
from .models import osQuestion

from questions.serializers import QuestionSerializer

# Create your views here.
def front(request):
    return JsonResponse({"success" : True})

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = osQuestion.objects.all()
    print(queryset.all())
    serializer_class = QuestionSerializer
