from django.http import JsonResponse
from django.urls import path

def product_detail(request, productId):
    a = "qweqew"
    b = "324234"
    c = "asdasdqewqwe"
    return JsonResponse({"id": str(productId), "name": f"{productId} name"})

urlpatterns = [
    path('products/<int:productId>/', product_detail),
]
