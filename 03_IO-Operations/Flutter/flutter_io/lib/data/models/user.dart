import 'dart:convert';
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final int id;
  final String email;
  final String username;
  final String password;
  final Name? name;
  final Address? address;
  final String phone;

  User(this.id, this.email, this.username, this.password, this.name,
      this.address, this.phone);

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

@JsonSerializable()
class Name {
  final String firstname;
  final String lastname;

  Name(this.firstname, this.lastname);

  factory Name.fromJson(Map<String, dynamic> json) => _$NameFromJson(json);

  Map<String, dynamic> toJson() => _$NameToJson(this);

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

@JsonSerializable()
class Address {
  final String city;
  final String street;
  final int number;
  final String zipcode;
  final GeoLocation geolocation;

  Address(this.city, this.street, this.number, this.zipcode, this.geolocation);

  factory Address.fromJson(Map<String, dynamic> json) =>
      _$AddressFromJson(json);

  Map<String, dynamic> toJson() => _$AddressToJson(this);

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

@JsonSerializable()
class GeoLocation {
  final String lat;
  final String long;

  GeoLocation(this.lat, this.long);

  factory GeoLocation.fromJson(Map<String, dynamic> json) =>
      _$GeoLocationFromJson(json);

  Map<String, dynamic> toJson() => _$GeoLocationToJson(this);

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}
