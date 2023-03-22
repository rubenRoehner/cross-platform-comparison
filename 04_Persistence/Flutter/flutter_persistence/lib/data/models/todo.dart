class Todo {
  final int? id;
  final String title;
  final DateTime due;
  final bool done;

  Todo(this.id, this.title, this.due, this.done);

  Map<String, Object?> toMap() {
    var map = <String, Object>{
      columnTitle: title,
      columnDue: due.millisecondsSinceEpoch,
      columnDone: done ? 1 : 0
    };
    if (id != null) {
      map[columnId] = id!;
    }
    return map;
  }

  factory Todo.fromMap(Map<String, Object?> map) => Todo(
      map[columnId] as int,
      map[columnTitle] as String,
      DateTime.fromMillisecondsSinceEpoch((map[columnDue] as int)),
      (map[columnDone] as int) == 1);

  static const String tableName = 'todos';
  static const String columnId = '_id';
  static const String columnTitle = 'title';
  static const String columnDue = 'due';
  static const String columnDone = 'done';
}
