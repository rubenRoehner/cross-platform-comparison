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
      title: Text(
        itemdata.title,
        style: Theme.of(context).textTheme.titleLarge,
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 4),
          Text(
            itemdata.subtitle.toUpperCase(),
            style: Theme.of(context).textTheme.subtitle1,
          ),
          const SizedBox(height: 4),
          Text(
            itemdata.description,
            style: Theme.of(context).textTheme.bodySmall,
          )
        ],
      ),
      trailing: Chip(
        label: Text("${itemdata.price} €"),
        backgroundColor: Colors.primaries[5],
      ),
      onTap: () {
        onButtonClicked();
      },
      contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
    );
  }
}

class ListitemData {
  final String title;
  final String subtitle;
  final String description;
  final String price;

  const ListitemData(this.title, this.description, this.price, this.subtitle);
}
