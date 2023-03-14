import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_lists/components/listitem.dart';
import 'package:flutter_lists/data/mock_data.dart';

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
        title: const Text("Flutter test list"),
      ),
      backgroundColor: CupertinoColors.systemBackground,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: CupertinoSearchTextField(
                controller: _textEditingController,
                onChanged: (value) {
                  setState(() {
                    listitems = getFilteredList(value);
                  });
                },
              ),
            ),
            Expanded(
              child: ListView.separated(
                itemCount: listitems.length,
                itemBuilder: (context, index) {
                  return ListItem(
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
                },
                separatorBuilder: (context, index) {
                  return const Divider();
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<ListitemData> getFilteredList(String filter) {
    List<ListitemData> list = getMockData(MainPage.itemCount).toList();
    list.removeWhere((element) =>
        !element.title.toLowerCase().contains(filter.toLowerCase()) &&
        !element.subtitle.toLowerCase().contains(filter.toLowerCase()) &&
        !element.description.toLowerCase().contains(filter.toLowerCase()));
    return list;
  }
}
