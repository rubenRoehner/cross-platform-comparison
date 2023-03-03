import 'package:flutter/material.dart';
import 'package:flutter_io/data/models/cart.dart';
import 'package:flutter_io/data/services/cart_service.dart';
import 'package:flutter_io/ui/screens/error_screen.dart';
import 'package:flutter_io/ui/screens/loading_screen.dart';

class CartsScreen extends StatefulWidget {
  const CartsScreen({super.key});

  @override
  State<CartsScreen> createState() => _CartsScreenState();
}

class _CartsScreenState extends State<CartsScreen> {
  late Future<List<Cart>> carts;

  @override
  void initState() {
    super.initState();
    carts = fetchAllCarts();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: carts,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const ErrorScreen();
        } else if (snapshot.hasData && snapshot.data != null) {
          return ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: snapshot.data!.length,
            itemBuilder: ((context, index) {
              var cart = snapshot.data![index];
              return _cartItem(cart);
            }),
          );
        } else {
          return const LoadingScreen();
        }
      },
    );
  }

  Widget _cartItem(Cart cart) {
    return Column(
      children: [
        ListTile(
          title: Text(cart.date.toLocal().toString()),
          subtitle: Text("${cart.products.length} Products"),
        ),
        const Divider()
      ],
    );
  }
}
