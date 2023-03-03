import 'dart:convert';

import 'package:json_annotation/json_annotation.dart';
part 'product.g.dart';

@JsonSerializable()
class Product {
  final int id;
  final String title;
  final num price;
  final String description;
  final String image;
  final String category;

  Product(this.id, this.title, this.price, this.description, this.image,
      this.category);

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);

  Map<String, dynamic> toJson() => _$ProductToJson(this)
      .map((key, value) => MapEntry(key, value.toString()));

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}
