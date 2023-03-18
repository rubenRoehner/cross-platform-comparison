import 'dart:convert';

class Cart {
  final int id;
  final int userId;
  final DateTime date;
  final List<CartEntry> products;

  Cart(this.id, this.userId, this.date, this.products);

  factory Cart.fromJson(Map<String, dynamic> json) => Cart(
        json['id'] as int,
        json['userId'] as int,
        DateTime.parse(json['date'] as String),
        (json['products'] as List<dynamic>)
            .map((e) => CartEntry.fromJson(e as Map<String, dynamic>))
            .toList(),
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'userId': userId,
        'date': date.toIso8601String(),
        'products': products,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

class CartEntry {
  final int productId;
  final int quantity;

  CartEntry(this.productId, this.quantity);

  factory CartEntry.fromJson(Map<String, dynamic> json) => CartEntry(
        json['productId'] as int,
        json['quantity'] as int,
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'productId': productId,
        'quantity': quantity,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}
