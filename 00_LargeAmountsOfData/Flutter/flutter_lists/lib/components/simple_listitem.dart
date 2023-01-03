import 'package:flutter/material.dart';

class SimpleListItem extends StatelessWidget {
  const SimpleListItem({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(title),
    );
  }
}
