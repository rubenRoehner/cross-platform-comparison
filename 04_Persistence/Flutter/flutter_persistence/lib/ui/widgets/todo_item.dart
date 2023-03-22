import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../data/models/todo.dart';

class TodoItem extends StatelessWidget {
  const TodoItem(
      {super.key,
      required this.todo,
      required this.onLongPress,
      required this.onCheckedChanged});

  final Todo todo;
  final void Function() onLongPress;
  final void Function(bool checked) onCheckedChanged;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPress: onLongPress,
      child: Card(
        margin: const EdgeInsets.symmetric(vertical: 10),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    Text(
                      todo.title,
                      style: const TextStyle(
                          fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      DateFormat.yMd().format(todo.due),
                    ),
                  ],
                ),
              ),
              Checkbox(
                value: todo.done,
                onChanged: (value) {
                  if (value != null) {
                    onCheckedChanged(value);
                  }
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
