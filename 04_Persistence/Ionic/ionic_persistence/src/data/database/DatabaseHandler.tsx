// SQLITE IMPORTS
import { SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

import { CapacitorSQLite } from "@capacitor-community/sqlite"
import { sqlite } from "../../App";
import { isTodo, Todo } from "../models/Todo";

const dbName = "sqlite-todos"

export const initdb = async () => {
    try {
        var database = await sqlite.createConnection(
            dbName,
            false,
            "no-encryption",
            1,
            false
        );

        database.execute("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, due TEXT NOT NULL, done INTEGER NOT NULL");

        return database;
    } catch (e) {
        window.alert(e);
        return null;
    }
};

export const getAllTodos = async (database: SQLiteDBConnection) => {
    await database.open();

    return database.query("SELECT * from todos;").then((results) => {
        return results.values?.map((value) => {
            return value as Todo
        });
    })
};

export const deleteTodo = async (database: SQLiteDBConnection, todoId: number) => {
    return await database.query("DELETE FROM todos WHERE id = ?;", [
        todoId + "",
    ]);
};

export const updateTodo = async (database: SQLiteDBConnection, todo: Todo) => {
    return await database.query(
        "UPDATE todos SET title=?, due=?, done=? WHERE id = ?;",
        [todo.title, todo.due.toISOString(), todo.done ? 1 : 0, todo.id + ""]
    );
};

export const createTodo = async (database: SQLiteDBConnection, todo: Todo) => {
    return await database.run(
        "INSERT INTO todos (title,due,done) VALUES(?,?,?)",
        [todo.title, todo.due.toISOString(), todo.done ? 1 : 0]
    );
};
