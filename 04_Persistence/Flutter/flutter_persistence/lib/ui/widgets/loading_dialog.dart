import 'package:flutter/material.dart';

void showLoadingDialog(BuildContext buildContext) {
  showDialog(
    context: buildContext,
    barrierDismissible: false,
    builder: (context) {
      return const Center(child: CircularProgressIndicator());
    },
  );
}
