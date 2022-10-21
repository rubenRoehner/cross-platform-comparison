import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_lists/ComplexListItem.dart';
import 'package:flutter_lists/SimpleListItem.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  final bool presentSimpleItem = false;
  static const int itemCount = 1000;

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter test largeAmountof Data"),
      ),
      backgroundColor: CupertinoColors.systemBackground,
      body: ListView.separated(
        itemCount: MainPage.itemCount,
        itemBuilder: (context, index) {
          if (widget.presentSimpleItem) {
            return SimpleListItem(title: "Item no.$index");
          } else {
            return ComplexListItem(
                title: "Item no.$index",
                subtitle:
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
                trailingIcon: Icons.chevron_right,
                onButtonClicked: () {
                  showDialog(
                    context: context,
                    builder: ((context) {
                      return AlertDialog(
                        title: const Text("Click event"),
                        content:
                            Text("Clicked on item with the number of $index"),
                      );
                    }),
                  );
                });
          }
        },
        separatorBuilder: (context, index) {
          return const Divider();
        },
      ),
    );
  }
}
