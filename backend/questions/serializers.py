from .models import osQuestion
from rest_framework import serializers

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = osQuestion
        fields = '__all__'