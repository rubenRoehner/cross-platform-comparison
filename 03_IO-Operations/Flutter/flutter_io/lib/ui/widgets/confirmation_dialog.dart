import 'package:flutter/material.dart';

void showConfirmationDialog(
    {required BuildContext context,
    required String title,
    required String content,
    required String buttonText,
    required void Function() onButtonPressed}) {
  showDialog(
    context: context,
    builder: (_) {
      print("sdfsdsgfgsgsfgsgsdf");
      return AlertDialog(
        title: Text(title),
        content: SingleChildScrollView(child: Text(content)),
        actions: [
          TextButton(onPressed: onButtonPressed, child: Text(buttonText))
        ],
        icon: const Icon(
          Icons.check_circle,
          size: 50,
        ),
      );
    },
  );
}
