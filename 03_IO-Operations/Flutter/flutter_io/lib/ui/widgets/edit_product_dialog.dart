import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../data/models/product.dart';

void showEditProductDialog(
    {required BuildContext context,
    required void Function(Product product) onButtonPressed,
    required Product product}) {
  showDialog(
    context: context,
    builder: (_) {
      print("object");
      print("dsagd");
      return AlertDialog(
        title: const Text("Create a new Product"),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Title',
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Description',
                ),
                minLines: 3,
                maxLines: 3,
              ),
              const SizedBox(height: 20),
              TextField(
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
