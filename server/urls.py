from django.urls import include, path
from rest_framework import routers
from server.engine import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api/user', views.user, name='user'),
    path('api/login', views.LoginView.as_view()),
    path('api/register', views.RegisterView.as_view())
]

print(urlpatterns)