import 'dart:convert';

class Product {
  final int id;
  final String title;
  final double price;
  final String description;
  final String image;
  final String category;

  Product(this.id, this.title, this.price, this.description, this.image,
      this.category);

  factory Product.fromJson(Map<String, dynamic> json) => Product(
        json['id'] as int,
        json['title'] as String,
        double.tryParse(json['price'].toString()) ?? 0.0,
        json['description'] as String,
        json['image'] as String,
        json['category'] as String,
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id.toString(),
        'title': title,
        'price': price.toString(),
        'description': description,
        'image': image,
        'category': category,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}
