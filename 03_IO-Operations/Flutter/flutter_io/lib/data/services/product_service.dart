import 'dart:convert';
import '../models/product.dart';
import 'package:http/http.dart' as http;

const baseURL = "fakestoreapi.com";
const productsEndpoint = "/products";

Future<List<Product>> fetchAllProducts() async {
  final response = await http.get(Uri.http(baseURL, productsEndpoint));
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    try {
      final parsedJson = jsonDecode(response.body);
      return parsedJson.map<Product>((json) => Product.fromJson(json)).toList();
    } catch (error) {
      return Future.error("Failed to fetch products. \n ${error.toString()}");
    }
  } else {
    return Future.error(
        "Failed to fetch products. \n status-code: ${response.statusCode}");
  }
}

Future<Product> fetchOneProduct() => fetchProductById(1);

Future<Product> fetchProductById(int id) async {
  final response = await http.get(Uri.http(baseURL, "$productsEndpoint/$id"));
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    try {
      return Product.fromJson(jsonDecode(response.body));
    } catch (error) {
      return Future.error(
          "Failed to add product with id $id. \n ${error.toString()}");
    }
  } else {
    return Future.error(
        "Failed to fetch product with id $id. \n status-code: ${response.statusCode}");
  }
}

Future<Product> addProduct(Product product) async {
  final serializedProduct = product.toJson();
  final response = await http.post(Uri.http(baseURL, productsEndpoint),
      body: serializedProduct);
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    try {
      return Product.fromJson(jsonDecode(response.body));
    } catch (error) {
      return Future.error(
          "Failed to add product with id ${product.id}. \n ${error.toString()}");
    }
  } else {
    return Future.error(
        "Failed to add product with id ${product.id}. \n status-code: ${response.statusCode}");
  }
}

Future<Product> deleteProduct(Product product) async {
  final response =
      await http.delete(Uri.http(baseURL, "$productsEndpoint/${product.id}"));
  if (response.statusCode == 200 && response.body.isNotEmpty) {
    try {
      return Product.fromJson(jsonDecode(response.body));
    } catch (error) {
      return Future.error(
          "Failed to delete product with id ${product.id}. \n ${error.toString()}");
    }
  } else {
    return Future.error(
        "Failed to delete product with id ${product.id}. \n status-code: ${response.statusCode}");
  }
}
