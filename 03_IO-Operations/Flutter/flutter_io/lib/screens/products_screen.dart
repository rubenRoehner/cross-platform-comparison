import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_io/screens/error_screen.dart';
import 'package:flutter_io/screens/loading_screen.dart';
import '../data/models/product.dart';
import '../data/services/product_service.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  late Future<List<Product>> products;

  @override
  void initState() {
    super.initState();
    products = fetchAllProducts();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: products,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const ErrorScreen();
        } else if (snapshot.hasData && snapshot.data != null) {
          return ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: snapshot.data!.length,
            itemBuilder: ((context, index) {
              var product = snapshot.data![index];
              return _productItem(product, () {
                _deleteProduct(product, context);
              });
            }),
          );
        } else {
          return const LoadingScreen();
        }
      },
    );
  }

  void _deleteProduct(Product product, BuildContext buildContext) {
    _presentDeleteModalSheet(buildContext, () {
      Navigator.of(buildContext).pop();
      _presentLoadingDialog(buildContext);

      deleteProduct(product).then((value) {
        Navigator.of(buildContext).pop();

        _presentDeletedDialog(buildContext, value, () {
          Navigator.of(buildContext).pop();
        });
      });
    });
  }

  void _presentDeleteModalSheet(
      BuildContext buildContext, void Function() onPressed) {
    showModalBottomSheet(
      context: buildContext,
      builder: (context) {
        return Container(
            padding: const EdgeInsets.all(20),
            child:
                TextButton(onPressed: onPressed, child: const Text("delete")));
      },
    );
  }

  void _presentLoadingDialog(BuildContext buildContext) {
    showDialog(
      context: buildContext,
      builder: (context) {
        return const Center(child: CircularProgressIndicator());
      },
    );
  }

  void _presentDeletedDialog(BuildContext buildContext, String deletedItem,
      void Function() onPressed) {
    showDialog(
      context: buildContext,
      builder: (context) {
        return AlertDialog(
          title: const Text("Deleted Product"),
          content: Text(deletedItem),
          actions: [
            TextButton(onPressed: onPressed, child: const Text("Okay!"))
          ],
        );
      },
    );
  }

  Widget _productItem(Product product, void Function() onLongPress) {
    return GestureDetector(
      onLongPress: onLongPress,
      child: Card(
        margin: const EdgeInsets.symmetric(vertical: 10),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Image.network(
                  product.image,
                  height: 150,
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                product.title,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              Text(
                product.description,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(product.category.toUpperCase()),
                  Chip(
                    label: Text(
                      "${product.price}€",
                      style: const TextStyle(
                          fontWeight: FontWeight.w500, color: Colors.white),
                    ),
                    backgroundColor: Colors.blue,
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
