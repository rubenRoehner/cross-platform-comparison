import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_io/ui/screens/error_screen.dart';
import 'package:flutter_io/ui/screens/loading_screen.dart';
import 'package:flutter_io/ui/widgets/confirmation_dialog.dart';
import 'package:flutter_io/ui/widgets/create_product_dialog.dart';
import 'package:flutter_io/ui/widgets/error_dialog.dart';
import '../../data/models/product.dart';
import '../../data/services/product_service.dart';
import '../widgets/edit_product_dialog.dart';
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
                    _editProduct(product, context);
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

  void _editProduct(Product product, BuildContext buildContext) {
    _presentEditModal(
      buildContext: buildContext,
      onDeletePressed: () {
        _deleteProduct(buildContext, product);
      },
      onUpdatePressed: () {
        Navigator.of(buildContext).pop();
        showEditProductDialog(
          context: buildContext,
          onButtonPressed: (updatedProduct) {
            _updateProduct(buildContext, updatedProduct);
          },
          product: product,
        );
      },
    );
  }

  void _presentEditModal(
      {required BuildContext buildContext,
      required void Function() onDeletePressed,
      required void Function() onUpdatePressed}) {
    showModalBottomSheet(
      context: buildContext,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(8))),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextButton(
                  onPressed: () {
                    onUpdatePressed();
                    Navigator.of(buildContext).pop();
                  },
                  child: const Text("udpate")),
              TextButton(
                onPressed: () {
                  onDeletePressed();
                  Navigator.of(buildContext).pop();
                },
                child: const Text(
                  "delete",
                  style: TextStyle(color: Colors.red),
                ),
              )
            ],
          ),
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

  void _createProduct(BuildContext buildContext) {
    showCreateProductDialog(
        context: buildContext,
        onButtonPressed: (product) {
          showLoadingDialog(buildContext);

          var wrongProduct =
              Product(22, "title", 0, "description", "image", "category");

          addProduct(wrongProduct).then((value) {
            Navigator.of(buildContext).pop();
            showConfirmationDialog(
              context: buildContext,
              title: "Added Product",
              content: value.title,
              buttonText: "Okay",
              onButtonPressed: () {
                Navigator.of(buildContext).pop();
              },
            );
          }, onError: (value) {
            Navigator.of(buildContext).pop();
            showErrorDialog(
              context: buildContext,
              title: "Error",
              content: "Could not add Product with ID ${product.id}. $value",
              buttonText: "Okay",
              onButtonPressed: () {
                Navigator.of(buildContext).pop();
              },
            );
          });
        });
  }

  void _deleteProduct(BuildContext buildContext, Product product) {
    showLoadingDialog(buildContext);

    // var wrongProduct = Product(22, "title", 0, "description", "image", "category");

    deleteProduct(product).then((value) {
      Navigator.of(buildContext).pop();
      showConfirmationDialog(
        context: buildContext,
        title: "Deleted Product",
        content: value.title,
        buttonText: "Okay",
        onButtonPressed: () {
          Navigator.of(buildContext).pop();
        },
      );
    }, onError: (value) {
      Navigator.of(buildContext).pop();
      showErrorDialog(
        context: buildContext,
        title: "Error",
        content: "Could not delete Product with ID ${product.id}.",
        buttonText: "Okay",
        onButtonPressed: () {
          Navigator.of(buildContext).pop();
        },
      );
    });
  }

  void _updateProduct(BuildContext buildContext, Product product) {
    showLoadingDialog(buildContext);

    // var wrongProduct = Product(22, "title", 0, "description", "image", "category");

    updateProduct(product).then((value) {
      Navigator.of(buildContext).pop();
      showConfirmationDialog(
        context: buildContext,
        title: "Updated Product",
        content: value.title,
        buttonText: "Okay",
        onButtonPressed: () {
          Navigator.of(buildContext).pop();
        },
      );
    }, onError: (value) {
      Navigator.of(buildContext).pop();
      showErrorDialog(
        context: buildContext,
        title: "Error",
        content: "Could not update Product with ID ${product.id}.",
        buttonText: "Okay",
        onButtonPressed: () {
          Navigator.of(buildContext).pop();
        },
      );
    });
  }
}
