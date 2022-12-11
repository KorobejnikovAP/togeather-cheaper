from django.urls import include, path
from rest_framework import routers
from server.engine import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/user', views.UserView.as_view()),
    path('api/profile/<int:pk>', views.ProfileView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/register', views.RegisterView.as_view()),
    path('api/collections', views.CollectionsView.as_view()),
    path('api/collection/<int:pk>', views.CollectionDetailView.as_view()),
    path('api/profile/<int:pk>/products', views.UserProductsView.as_view()),
    path('api/profile/<int:pk>/collections', views.UserCollectionsView.as_view()),
    path('api/create_product', views.CreateProduct.as_view()),
    path('api/create_collection', views.CreateCollection.as_view()),
    path('api/add_user_to_collection/<int:pk>', views.AddUserToCollection.as_view()),
    path('api/add_address/<int:pk>', views.AddAddressToUser.as_view()),
    #path('api/close_collection/<int:pk>'),
]

print(urlpatterns)