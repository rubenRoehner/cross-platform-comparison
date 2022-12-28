import 'dart:convert';

import 'package:json_annotation/json_annotation.dart';

part 'cart.g.dart';

@JsonSerializable()
class Cart {
  final int id;
  final int userId;
  final DateTime date;
  final List<CartEntry> products;

  Cart(this.id, this.userId, this.date, this.products);

  factory Cart.fromJson(Map<String, dynamic> json) => _$CartFromJson(json);

  Map<String, dynamic> toJson() => _$CartToJson(this);

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

@JsonSerializable()
class CartEntry {
  final int productId;
  final int quantity;

  CartEntry(this.productId, this.quantity);

  factory CartEntry.fromJson(Map<String, dynamic> json) =>
      _$CartEntryFromJson(json);

  Map<String, dynamic> toJson() => _$CartEntryToJson(this);

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}
