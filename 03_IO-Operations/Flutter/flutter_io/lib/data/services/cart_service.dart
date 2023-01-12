import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/cart.dart';

const baseURL = "fakestoreapi.com";
const cartEndpoint = "/carts";

Future<List<Cart>> fetchAllCarts() async {
  final response = await http.get(Uri.http(baseURL, cartEndpoint));
  if (response.statusCode == 200) {
    final parsedJson = json.decode(response.body).cast<Map<String, dynamic>>();
    return parsedJson.map<Cart>((json) => Cart.fromJson(json)).toList();
  } else {
    return Future.error(
        "Failed to download Carts. \n status-code: ${response.statusCode}");
  }
}
