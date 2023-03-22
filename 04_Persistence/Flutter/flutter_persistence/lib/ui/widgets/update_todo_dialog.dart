import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../data/models/todo.dart';

void showUpdateTodoDialog(
    {required BuildContext context,
    required void Function(Todo todo) onUpdateButtonPressed,
    required void Function() onDeleteButtonPressed,
    required Todo todo}) {
  showDialog(
    context: context,
    builder: (_) {
      TextEditingController titleTextEditingController =
          TextEditingController(text: todo.title);
      TextEditingController dateTextEditingController =
          TextEditingController(text: todo.due.toString());
      DateTime selectedDate = DateTime.now();

      return AlertDialog(
        title: const Text("Update Todo"),
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
              onDeleteButtonPressed();
              Navigator.of(context).pop();
            },
            child: const Text(
              "Delete",
              style: TextStyle(color: Colors.red),
            ),
          ),
          const SizedBox(width: 12),
          TextButton(
            onPressed: () {
              onUpdateButtonPressed(Todo(todo.id,
                  titleTextEditingController.text, selectedDate, todo.done));
              Navigator.of(context).pop();
            },
            child: const Text("Update"),
          ),
        ],
      );
    },
  );
}
