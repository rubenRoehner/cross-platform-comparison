import 'dart:convert';

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

  factory User.fromJson(Map<String, dynamic> json) => User(
        json['id'] as int,
        json['email'] as String,
        json['username'] as String,
        json['password'] as String,
        json['name'] == null
            ? null
            : Name.fromJson(json['name'] as Map<String, dynamic>),
        json['address'] == null
            ? null
            : Address.fromJson(json['address'] as Map<String, dynamic>),
        json['phone'] as String,
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'email': email,
        'username': username,
        'password': password,
        'name': name,
        'address': address,
        'phone': phone,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

class Name {
  final String firstname;
  final String lastname;

  Name(this.firstname, this.lastname);

  factory Name.fromJson(Map<String, dynamic> json) => Name(
        json['firstname'] as String,
        json['lastname'] as String,
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'firstname': firstname,
        'lastname': lastname,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

class Address {
  final String city;
  final String street;
  final int number;
  final String zipcode;
  final GeoLocation geolocation;

  Address(this.city, this.street, this.number, this.zipcode, this.geolocation);

  factory Address.fromJson(Map<String, dynamic> json) => Address(
        json['city'] as String,
        json['street'] as String,
        json['number'] as int,
        json['zipcode'] as String,
        GeoLocation.fromJson(json['geolocation'] as Map<String, dynamic>),
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'city': city,
        'street': street,
        'number': number,
        'zipcode': zipcode,
        'geolocation': geolocation,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}

class GeoLocation {
  final String lat;
  final String long;

  GeoLocation(this.lat, this.long);

  factory GeoLocation.fromJson(Map<String, dynamic> json) => GeoLocation(
        json['lat'] as String,
        json['long'] as String,
      );

  Map<String, dynamic> toJson() => <String, dynamic>{
        'lat': lat,
        'long': long,
      };

  @override
  String toString() {
    return const JsonEncoder.withIndent("    ").convert(toJson());
  }
}
