import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_persistence/data/db/database_helper.dart';
import 'package:flutter_persistence/ui/widgets/todo_item.dart';
import 'package:flutter_persistence/ui/widgets/update_todo_dialog.dart';
import 'package:intl/intl.dart';
import '../../data/models/todo.dart';
import '../widgets/create_todo_dialog.dart';
import '../widgets/loading_dialog.dart';
import 'error_screen.dart';
import 'loading_screen.dart';

class TodosScreen extends StatefulWidget {
  const TodosScreen({super.key});

  @override
  State<TodosScreen> createState() => _TodosScreenState();
}

class _TodosScreenState extends State<TodosScreen> {
  late Future<List<Todo>> todos;

  @override
  void initState() {
    super.initState();
    print("init");
    todos = DatabaseHelper.singleton.todos();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: todos,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const ErrorScreen();
        } else if (snapshot.hasData && snapshot.data != null) {
          return Builder(builder: (context) {
            return Scaffold(
              body: ListView.builder(
                padding: const EdgeInsets.all(10),
                itemCount: snapshot.data!.length,
                itemBuilder: ((context, index) {
                  var todo = snapshot.data![index];
                  return TodoItem(
                    todo: todo,
                    onLongPress: () {
                      showUpdateTodoDialog(
                          context: context,
                          onUpdateButtonPressed: (updatedTodo) {
                            showLoadingDialog(context);
                            _updateTodo(context, updatedTodo);
                          },
                          onDeleteButtonPressed: () {
                            showLoadingDialog(context);
                            _deleteTodo(context, todo);
                          },
                          todo: todo);
                    },
                    onCheckedChanged: (value) {
                      showLoadingDialog(context);
                      _updateTodo(
                          context, Todo(todo.id, todo.title, todo.due, value));
                    },
                  );
                }),
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: () {
                  showCreateTodoDialog(
                    context: context,
                    onButtonPressed: (todo) {
                      showLoadingDialog(context);
                      _insertTodo(context, todo);
                    },
                  );
                },
                child: const Icon(Icons.add),
              ),
            );
          });
        } else {
          return const LoadingScreen();
        }
      },
    );
  }

  void _insertTodo(BuildContext buildContext, Todo todo) {
    DatabaseHelper.singleton.insert(todo).then((value) {
      Navigator.of(buildContext).pop();
      _updateTodos();
    }, onError: (value) {
      Navigator.of(buildContext).pop();
      _showSnackbar(
          "Error: failed to add product ${todo.title}", Icons.error_outline);
    });
  }

  void _updateTodo(BuildContext buildContext, Todo todo) {
    print("update: ${todo.due}");
    DatabaseHelper.singleton.update(todo).then((value) {
      print("updated todo: $value");
      Navigator.of(buildContext).pop();
      _updateTodos();
    }, onError: (value) {
      Navigator.of(buildContext).pop();
      _showSnackbar(
          "Error: failed to update product ${todo.title}", Icons.error_outline);
    });
  }

  void _deleteTodo(BuildContext buildContext, Todo todo) {
    if (todo.id == null) return;
    DatabaseHelper.singleton.delete(todo.id!).then((value) {
      Navigator.of(buildContext).pop();
      _updateTodos();
    }, onError: (value) {
      Navigator.of(buildContext).pop();
      _showSnackbar(
          "Error: failed to delete product ${todo.title}", Icons.error_outline);
    });
  }

  void _updateTodos() {
    setState(() {
      todos = DatabaseHelper.singleton.todos();
      print("Updated todos");
    });
  }

  void _showSnackbar(String text, IconData leadingIcon) {
    var snackBar = SnackBar(
      content: Row(
        children: [
          Icon(leadingIcon),
          Text(text),
        ],
      ),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
