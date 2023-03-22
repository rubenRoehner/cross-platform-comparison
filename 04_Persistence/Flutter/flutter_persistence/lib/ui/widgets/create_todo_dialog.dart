import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../data/models/todo.dart';

void showCreateTodoDialog(
    {required BuildContext context,
    required void Function(Todo todo) onButtonPressed}) {
  showDialog(
    context: context,
    builder: (_) {
      TextEditingController titleTextEditingController =
          TextEditingController(text: "");
      TextEditingController dateTextEditingController =
          TextEditingController(text: "");
      DateTime selectedDate = DateTime.now();

      return AlertDialog(
        title: const Text("Create a new Product"),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Title',
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: dateTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Due',
                ),
                readOnly: true,
                onTap: () async {
                  DateTime pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(),
                        firstDate: DateTime.now(),
                        lastDate: DateTime.now().add(const Duration(days: 365)),
                      ) ??
                      DateTime.now();
                  selectedDate = pickedDate;
                  dateTextEditingController.text =
                      DateFormat.yMd().format(pickedDate);
                },
              )
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text("Cancel"),
          ),
          const SizedBox(width: 12),
          TextButton(
            onPressed: () {
              onButtonPressed(Todo(
                  null, titleTextEditingController.text, selectedDate, false));
              Navigator.of(context).pop();
            },
            child: const Text("Create"),
          ),
        ],
      );
    },
  );
}
