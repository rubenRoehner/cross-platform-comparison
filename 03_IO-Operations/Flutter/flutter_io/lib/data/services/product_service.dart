import 'dart:convert';
import '../models/product.dart';
import 'package:http/http.dart' as http;

const baseURL = "fakestoreapi.com";
const productsEndpoint = "/products";
const categoriesEndpoint = "/products/categories";

Future<List<Product>> fetchAllProducts() async {
  final response = await http.get(Uri.http(baseURL, productsEndpoint));
  if (response.statusCode == 200) {
    final parsedJson = json.decode(response.body).cast<Map<String, dynamic>>();
    return parsedJson.map<Product>((json) => Product.fromJson(json)).toList();
  } else {
    return Future.error(
        "Failed to download products. \n status-code: ${response.statusCode}");
  }
}

Future<Product> fetchOneProduct() => fetchProductById(1);

Future<Product> fetchProductById(int id) async {
  final response = await http.get(Uri.http(baseURL, "$productsEndpoint/$id"));
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    final parsedJson = json.decode(response.body);
    return Product.fromJson(parsedJson);
  } else {
    return Future.error(
        "Failed to download product with id: $id. \n status-code: ${response.statusCode}");
  }
}

Future<String> addExampleProduct() => addProduct(
    Product(20, "Example title", 10, "Example product", "", "category"));

Future<String> addProduct(Product product) async {
  final serializedProduct = product.toJson();
  final response = await http.post(Uri.http(baseURL, productsEndpoint),
      body: serializedProduct);
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    final parsedJson = json.decode(response.body);
    return parsedJson.toString();
  } else {
    return Future.error(
        "Failed to upload product. \n status-code: ${response.statusCode}");
  }
}

Future<String> updateExampleProduct() => updateProduct(
    Product(1, "Example title", 10, "Example product", "", "category"));

Future<String> updateProduct(Product product) async {
  final response = await http.put(
      Uri.http(baseURL, "$productsEndpoint/${product.id}"),
      body: product.toJson());
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    final parsedJson = json.decode(response.body);
    return parsedJson.toString();
  } else {
    return Future.error(
        "Failed to update product. \n status-code: ${response.statusCode}");
  }
}

Future<String> deleteExampleProduct() => deleteProduct(
    Product(1, "Example title", 10, "Example product", "", "category"));

Future<String> deleteProduct(Product product) async {
  final response =
      await http.delete(Uri.http(baseURL, "$productsEndpoint/${product.id}"));
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    final parsedJson = json.decode(response.body);
    return parsedJson.toString();
  } else {
    return Future.error(
        "Failed to update product. \n status-code: ${response.statusCode}");
  }
}

Future<List<String>> fetchAllCategories() async {
  final response = await http.get(Uri.http(baseURL, categoriesEndpoint));
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    final parsedJson = json.decode(response.body);
    return (parsedJson as List<dynamic>).map((e) => e.toString()).toList();
  } else {
    return Future.error(
        "Failed to update product. \n status-code: ${response.statusCode}");
  }
}
