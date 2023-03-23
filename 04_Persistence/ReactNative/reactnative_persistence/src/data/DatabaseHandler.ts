import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Todo } from '../data/Todo';

const tableName = 'todos';

enablePromise(true);

export const getDatabaseConnection = async () => {
    return openDatabase({ name: 'todo-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        title TEXT NOT NULL,
        dueDate TEXT NOT NULL,
        completed INTEGER NOT NULL
    );`;

    await db.executeSql(query);
};

export const getAllTodos = async (db: SQLiteDatabase): Promise<Todo[]> => {
    try {
        const todoItems: Todo[] = [];
        const results = await db.executeSql(`SELECT rowid as id,title,dueDate,completed FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                var item = result.rows.item(index)
                todoItems.push({
                    id: item.id as number,
                    title: item.title as string,
                    completed: (item.completed as number) == 1,
                    dueDate: new Date(item.dueDate as string)
                })
            }
        });
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get todoItems!');
    }
};

export const insertTodo = async (db: SQLiteDatabase, todo: Todo) => {
    const insertQuery =
        `INSERT INTO todos (title,dueDate,completed) VALUES` +
        `('${todo.title}', '${todo.dueDate.toISOString()}', '${todo.completed ? 1 : 0}')`;
    console.log(insertQuery)
    return db.executeSql(insertQuery);
};

export const updateTodo = async (db: SQLiteDatabase, todo: Todo) => {
    const updateQuery =
        `UPDATE ${tableName} SET title = '${todo.title}', dueDate = '${todo.dueDate.toISOString()}',completed = '${todo.completed ? 1 : 0}' WHERE rowid = '${todo.id}'`;

    return db.executeSql(updateQuery);
}

export const deleteTodo = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};
