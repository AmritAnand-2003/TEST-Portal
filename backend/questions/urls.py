from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('ques', views.UserViewSet)

urlpatterns = [
    path("", views.front, name="front"),
    path('api/', include(router.urls)),    
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# urlpatterns += router.urls