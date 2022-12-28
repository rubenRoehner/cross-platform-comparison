// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cart.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Cart _$CartFromJson(Map<String, dynamic> json) => Cart(
      json['id'] as int,
      json['userId'] as int,
      DateTime.parse(json['date'] as String),
      (json['products'] as List<dynamic>)
          .map((e) => CartEntry.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$CartToJson(Cart instance) => <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'date': instance.date.toIso8601String(),
      'products': instance.products,
    };

CartEntry _$CartEntryFromJson(Map<String, dynamic> json) => CartEntry(
      json['productId'] as int,
      json['quantity'] as int,
    );

Map<String, dynamic> _$CartEntryToJson(CartEntry instance) => <String, dynamic>{
      'productId': instance.productId,
      'quantity': instance.quantity,
    };
