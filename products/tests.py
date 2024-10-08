from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ProductDetailTests(APITestCase):
    def test_product_detail(self):
        # Виконати GET запит до ендпоінта
        response = self.client.get(reverse('product_detail', args=[1]))
        # Перевірити статус-код відповіді
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Перевірити, що відповідь містить правильні дані
        self.assertEqual(response.json(), {"id": "1", "name": "1 name"})
