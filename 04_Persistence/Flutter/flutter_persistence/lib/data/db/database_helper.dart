import 'dart:async';

import 'package:sqflite/sqflite.dart';

import '../models/todo.dart';

class DatabaseHelper {
  DatabaseHelper._();
  static final DatabaseHelper singleton = DatabaseHelper._();
  Database? _database;

  FutureOr<Database> get database async {
    if (_database != null) return _database!;
    _database = await initDB();
    return _database!;
  }

  Future<Database> initDB() async {
    return await openDatabase("sqlite_database", version: 1,
        onCreate: (Database db, int version) async {
      await db.execute('''
        create table ${Todo.tableName} ( 
          ${Todo.columnId} integer primary key autoincrement, 
          ${Todo.columnTitle} text not null,
          ${Todo.columnDue} integer not null,
          ${Todo.columnDone} integer not null)
        ''');
    });
  }

  Future<List<Todo>> todos() async {
    await database;
    return _database!
        .query(Todo.tableName)
        .then((value) => value.map((e) => Todo.fromMap(e)).toList());
  }

  Future<Todo> insert(Todo todo) async {
    await database;
    int id = await _database!.insert(Todo.tableName, todo.toMap());
    return Todo(id, todo.title, todo.due, todo.done);
  }

  Future<int> delete(int id) async {
    await database;
    return await _database!
        .delete(Todo.tableName, where: '${Todo.columnId} = ?', whereArgs: [id]);
  }

  Future<int> update(Todo todo) async {
    await database;
    return await _database!.update(Todo.tableName, todo.toMap(),
        where: '${Todo.columnId} = ?', whereArgs: [todo.id]);
  }

  Future close() async => _database!.close();
}
