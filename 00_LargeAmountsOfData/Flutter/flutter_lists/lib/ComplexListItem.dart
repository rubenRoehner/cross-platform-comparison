import 'package:flutter/material.dart';

class ComplexListItem extends StatelessWidget {
  const ComplexListItem(
      {super.key,
      required this.title,
      required this.subtitle,
      required this.trailingIcon,
      required this.onButtonClicked});

  final String title;
  final String subtitle;
  final IconData trailingIcon;
  final Function onButtonClicked;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(title),
      subtitle: Text(subtitle),
      trailing: Icon(trailingIcon),
      onTap: () {
        onButtonClicked();
      },
    );
  }
}
