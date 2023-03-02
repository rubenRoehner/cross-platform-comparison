import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_lists/components/complex_listitem.dart';
import 'package:flutter_lists/components/simple_listitem.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  final bool presentSimpleItem = false;
  static const int itemCount = 1000;

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final TextEditingController _textEditingController =
      TextEditingController(text: "");

  List<ListitemData> listitems = [];

  @override
  void initState() {
    super.initState();
    listitems = getFilteredList(_textEditingController.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter test largeAmountof Data"),
      ),
      backgroundColor: CupertinoColors.systemBackground,
      body: Column(
        children: [
          CupertinoSearchTextField(
            controller: _textEditingController,
            onChanged: (value) {
              setState(() {
                listitems = getFilteredList(value);
              });
            },
          ),
          Expanded(
            child: ListView.separated(
              itemCount: listitems.length,
              itemBuilder: (context, index) {
                if (widget.presentSimpleItem) {
                  return SimpleListItem(title: listitems[index].title);
                } else {
                  return ComplexListItem(
                      itemdata: listitems[index],
                      trailingIcon: Icons.chevron_right,
                      onButtonClicked: () {
                        showDialog(
                          context: context,
                          builder: ((context) {
                            return AlertDialog(
                              title: const Text("Click event"),
                              content: Text(
                                  "Clicked on item with the number of $index"),
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
          ),
        ],
      ),
    );
  }

  List<ListitemData> getFilteredList(String filter) {
    List<ListitemData> list = List.empty(growable: true);

    for (int i = 0; i < MainPage.itemCount; i++) {
      list.add(ListitemData("Item no.$i",
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr."));
    }
    list.removeWhere((element) =>
        !element.title.toLowerCase().contains(filter.toLowerCase()) &&
        !element.subtitle.toLowerCase().contains(filter.toLowerCase()));
    return list;
  }
}
