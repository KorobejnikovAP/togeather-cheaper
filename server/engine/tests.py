from django.test import TestCase, Client
from .models import User, Collection, Product
from rest_framework.test import force_authenticate, APIClient
import unittest



# Create your tests here.

class TestPostReq(TestCase):

    def setUp(self):
        user = User.objects.create(username="testUser", password="qwerty123", email="testuser@mail.ru",
                                   user_role="client")
        user.save()

        man = User.objects.create(username="testManager1", password="asdfg123", email="testmanager1@mail.ru",
                                   user_role="manager")
        man.save()

        self.manager = man
        self.client = APIClient()

        prod1 = Product.objects.create(name="testProduct", price=200, manager=man)
        prod1.save()

    def test_can_register(self):
        resp = self.client.post("/api/register", data={"username": "testUser1", "password": "qwerty456",
                                                       "email": "testuser1@mail.ru", "user_role": "client"})
        self.assertEqual(resp.status_code, 200)

    def test_cant_register_without_params(self):
        resp1 = self.client.post("/api/register", data={"username": "testUser2", "password": "qwerty789",
                                                        "user_role": "client"})
        self.assertEqual(resp1.status_code, 400)
        resp2 = self.client.post("/api/register", data={"username": "testUser3", "password": "qwerty321",
                                                        "email": "testuser3@mail.ru"})
        self.assertEqual(resp2.status_code, 400)

    def test_can_login(self):
        resp = self.client.post("/api/login", data={"username": "testUser", "password": "qwerty123"})
        self.assertEqual(resp.status_code, 200)

    def test_cant_login_with_wrong_params(self):
        resp1 = self.client.post("/api/login", data={"username": "testUserOneMore", "password": "qwerty123"})
        self.assertEqual(resp1.status_code, 400)
        resp2 = self.client.post("/api/login", data={"username": "testUser", "password": "qwerty"})
        self.assertEqual(resp2.status_code, 400)

    def test_can_create_product(self):
        self.client.force_authenticate(self.manager)
        resp1 = self.client.post("/api/create_product", data={"name_product": "testProduct", "price": 200})
        self.assertEqual(resp1.status_code, 201)

    def test_cant_create_product_with_wrong_params(self):
        self.client.force_authenticate(self.manager)
        resp1 = self.client.post("/api/create_product", data={"name_product": "", "price": 200})
        self.assertEqual(resp1.status_code, 400)

    def test_can_create_collection(self):
        self.client.force_authenticate(self.manager)
        resp1 = self.client.post("/api/create_collection", data={"name_product": "testProduct", "count_for_buy": 200})
        self.assertEqual(resp1.status_code, 201)

    def test_can_create_collection_with_wrong_params(self):
        self.client.force_authenticate(self.manager)
        resp1 = self.client.post("/api/create_collection", data={"name_product": "", "count_for_buy": 200})
        self.assertEqual(resp1.status_code, 400)




class AccountTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testClient1", password="qwerty123", email="testclient1@mail.ru",
                                             user_role="client")
        self.client = APIClient()

    def test_get_user_data(self):
        self.client.force_authenticate(self.user)
        resp = self.client.get("/api/user")
        stat = resp.json()
        self.assertEqual(stat["username"], "testClient1")

    def test_get_profile_data(self):
        self.client.force_authenticate(self.user)
        resp = self.client.get("/api/profile/1")
        stat = resp.json()
        self.assertEqual(stat["username"], "testClient1")
        self.assertEqual(stat["user_role"], "client")


class TestGetReq(TestCase):

    def setUp(self):
        c = Client()
        c.post("/api/register", data={"username": "testClient1", "password": "qwerty123", "user_role": "client"})
        c.post("/api/register", data={"username": "testClient2", "password": "qwerty321", "user_role": "client"})


        man1 = User.objects.create(username="testManager1", password="asdfg123", email="testmanager1@mail.ru",
                                   user_role="manager")
        man1.save()

        self.manager = man1
        self.client = APIClient()

        man2 = User.objects.create(username="testManager2", password="asdfg321", email="testmanager2@mail.ru",
                                   user_role="manager")
        man2.save()

        prod1 = Product.objects.create(name="Product1", price=200, manager=man1)
        prod1.save()
        prod2 = Product.objects.create(name="Product2", price=500, manager=man2)
        prod2.save()

        coll1 = Collection.objects.create(product=prod1, manager=man1, countForBuy=100)
        coll1.save()
        coll2 = Collection.objects.create(product=prod2, manager=man2, countForBuy=50)
        coll2.save()

        user1 = User.objects.create(username="testClient3", password="asdfg1234", email="testclient@mail.ru",
                                    user_role="client")
        self.user = user1

    def test_can_get_collections(self):
        resp = self.client.get("/api/collections")
        colls = resp.json()
        fprod = colls[0]["product"]
        fman = colls[0]["manager"]
        self.assertEqual(fprod["name"], "Product1")
        self.assertEqual(fprod["price"], 200)
        self.assertEqual(fman["username"], "testManager1")
        self.assertEqual(colls[0]["count_for_buy"], 100)
        sprod = colls[1]["product"]
        sman = colls[1]["manager"]
        self.assertEqual(sprod["name"], "Product2")
        self.assertEqual(sprod["price"], 500)
        self.assertEqual(sman["username"], "testManager2")
        self.assertEqual(colls[1]["count_for_buy"], 50)

    def test_can_get_particular_collection(self):
        resp = self.client.get("/api/collection/1")
        res_coll = resp.json()
        prod = res_coll["product"]
        man = res_coll["manager"]
        self.assertEqual(prod["name"], "Product1")
        self.assertEqual(prod["price"], 200)
        self.assertEqual(man["username"], "testManager1")
        self.assertEqual(res_coll["count_for_buy"], 100)

    def test_can_get_products_from_manager(self):
        self.client.force_authenticate(self.manager)
        resp = self.client.get("/api/profile/1/products")
        result = resp.json()
        result_first = result[0]
        self.assertEqual(result_first["name"], "Product1")
        self.assertEqual(result_first["price"], 200)

    @unittest.skip("skip the test")
    def test_can_get_collection_from_client(self):
        self.client.force_authenticate(self.user)
        resp = self.client.get("/api/profile/2/collections")
        result = resp.json()
        fprod = result[0]["product"]
        fman = result[0]["manager"]
        self.assertEqual(fprod["name"], "Product1")
        self.assertEqual(fprod["price"], 200)
        self.assertEqual(fman["username"], "testManager1")
        self.assertEqual(result[0]["count_for_buy"], 100)