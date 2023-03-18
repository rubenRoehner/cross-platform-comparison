import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_io/ui/screens/error_screen.dart';
import 'package:flutter_io/ui/screens/loading_screen.dart';
import 'package:flutter_io/ui/widgets/create_product_dialog.dart';
import '../../data/models/product.dart';
import '../../data/services/product_service.dart';
import '../widgets/loading_dialog.dart';

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
          return Builder(builder: (context) {
            return Scaffold(
              body: ListView.builder(
                padding: const EdgeInsets.all(10),
                itemCount: snapshot.data!.length,
                itemBuilder: ((context, index) {
                  var product = snapshot.data![index];
                  return _productItem(product, () {
                    _deleteProduct(context, product);
                  });
                }),
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: () {
                  _createProduct(context);
                },
                child: const Icon(Icons.add),
              ),
            );
          });
        } else {
          return const LoadingScreen();
        }
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

  void _createProduct(BuildContext buildContext) {
    showCreateProductDialog(
        context: buildContext,
        onButtonPressed: (product) {
          showLoadingDialog(buildContext);

          addProduct(product).then((value) {
            Navigator.of(buildContext).pop();
            _showSnackbar("Successfully added product ${product.title}",
                Icons.info_outline);
          }, onError: (value) {
            Navigator.of(buildContext).pop();
            _showSnackbar("Error: failed to add product ${product.title}",
                Icons.error_outline);
          });
        });
  }

  void _showSnackbar(String text, IconData leadingIcon) {
    var snackBar = SnackBar(
      content: Row(
        children: [
          Icon(leadingIcon),
          Text(text),
        ],
      ),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  void _deleteProduct(BuildContext buildContext, Product product) {
    showLoadingDialog(buildContext);

    deleteProduct(product).then((value) {
      Navigator.of(buildContext).pop();
      _showSnackbar(
          "Successfully deleted product ${product.title}", Icons.info_outline);
    }, onError: (value) {
      Navigator.of(buildContext).pop();
      _showSnackbar("Error: failed to delete product ${product.title}",
          Icons.error_outline);
    });
  }
}
