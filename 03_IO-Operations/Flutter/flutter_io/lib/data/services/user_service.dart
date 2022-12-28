import 'dart:convert';
import 'package:flutter_io/data/models/user.dart';
import 'package:http/http.dart' as http;

const baseURL = "fakestoreapi.com";
const userEndpoint = "/users";

Future<List<User>> fetchAllUser() async {
  final response = await http.get(Uri.http(baseURL, userEndpoint));
  if (response.statusCode == 200) {
    final parsedJson = json.decode(response.body).cast<Map<String, dynamic>>();
    return parsedJson.map<User>((json) => User.fromJson(json)).toList();
  } else {
    return Future.error(
        "Failed to download carts. \n status-code: ${response.statusCode}");
  }
}
