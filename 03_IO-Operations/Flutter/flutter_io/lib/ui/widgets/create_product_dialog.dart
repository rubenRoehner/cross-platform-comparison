import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../data/models/product.dart';

void showCreateProductDialog(
    {required BuildContext context,
    required void Function(Product product) onButtonPressed,
    Product? product}) {
  showDialog(
    context: context,
    builder: (_) {
      TextEditingController titleTextEditingController =
          TextEditingController(text: product?.title ?? "");
      TextEditingController descriptionTextEditingController =
          TextEditingController(text: product?.description ?? "");
      TextEditingController priceTextEditingController =
          TextEditingController(text: product?.description ?? "");

      print("object");
      print("dsagd");
      return AlertDialog(
        title: const Text("Create a new Product"),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Title',
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: descriptionTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Description',
                ),
                minLines: 3,
                maxLines: 3,
              ),
              const SizedBox(height: 20),
              TextField(
                controller: priceTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Price',
                ),
                keyboardType: TextInputType.number,
                inputFormatters: <TextInputFormatter>[
                  FilteringTextInputFormatter.digitsOnly
                ],
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              var price = double.tryParse(priceTextEditingController.text) ?? 0;
              onButtonPressed(Product(
                  Random().nextInt(99) + 21,
                  titleTextEditingController.text,
                  price,
                  descriptionTextEditingController.text,
                  "image",
                  "category"));
              Navigator.of(context).pop();
            },
            child: const Text("Create"),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text("Cancel"),
          ),
        ],
      );
    },
  );
}
