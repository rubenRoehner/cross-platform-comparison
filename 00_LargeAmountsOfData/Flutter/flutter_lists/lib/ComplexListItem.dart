import 'package:flutter/material.dart';

class ComplexListItem extends StatelessWidget {
  const ComplexListItem(
      {super.key,
      required this.itemdata,
      required this.trailingIcon,
      required this.onButtonClicked});

  final ListitemData itemdata;
  final IconData trailingIcon;
  final Function onButtonClicked;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(itemdata.title),
      subtitle: Text(itemdata.subtitle),
      trailing: Icon(trailingIcon),
      onTap: () {
        onButtonClicked();
      },
    );
  }
}

class ListitemData {
  final String title;
  final String subtitle;

  ListitemData(this.title, this.subtitle);
}
