import { SQLiteDBConnection } from "@capacitor-community/sqlite";

import { sqlite } from "../../App";
import { Todo } from "../models/Todo";

const dbName = "sqlite-todos"

export const initdb = async () => {
    try {
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection(dbName, false)).result;
        var db: SQLiteDBConnection
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection(dbName, false);
        } else {
            db = await sqlite.createConnection(dbName, false, "no-encryption", 1, false);
        }

        await db.open();
        let query = `
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT NOT NULL, 
            dueDate TEXT NOT NULL, 
            completed INTEGER NOT NULL);
        `

        await db.execute(query);
        return db;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getAllTodos = async (database: SQLiteDBConnection) => {
    await database.open();

    return database.query("SELECT * from todos;").then((results) => {
        return results.values?.map((value) => {
            var todo: Todo = {
                id: value.id as number,
                title: value.title as string,
                dueDate: new Date(value.dueDate as string),
                completed: (value.completed as number) === 1
            }
            return todo
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
        "UPDATE todos SET title=?, dueDate=?, completed=? WHERE id = ?;",
        [todo.title, todo.dueDate.toISOString(), todo.completed ? 1 : 0, todo.id + ""]
    );
};

export const createTodo = async (database: SQLiteDBConnection, todo: Todo) => {
    var res = await database.run(
        "INSERT INTO todos (title,dueDate,completed) VALUES(?,?,?)",
        [todo.title, todo.dueDate.toISOString(), todo.completed ? 1 : 0]
    );
    return res
};
