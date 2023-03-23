import { IonPage, IonContent, IonList, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState, useEffect } from "react";
import { SQLiteDBConnection } from "react-sqlite-hook";
import CreateTodoDialog from "../components/CreateTodoDialog";
import TodoListItem from "../components/TodoListItem";
import UpdateTodoDialog from "../components/UpdateTodoDialog";
import { createTodo, deleteTodo, getAllTodos, initdb, updateTodo } from "../data/database/DatabaseHandler";
import { Todo } from "../data/models/Todo";
import LoadingScreen from "./LoadingScreen";

const TodosScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [presentCreateDialog, setPresentCreateDialog] = useState(false)
    const [selectedTodo, selectTodo] = useState<Todo | undefined>()

    const [sqliteConnection, setSqliteConnection] = useState<SQLiteDBConnection | undefined>()

    useEffect(() => {
        initdb().then((connection) => {
            console.log("init con" + connection)
            if (connection) {
                setSqliteConnection(connection)
                updateTodos(connection)
            }
        })
    }, [])

    const updateTodos = (connection: SQLiteDBConnection) => {
        // setIsLoading(true)
        getAllTodos(connection).then((value) => {
            if (value !== undefined) {
                setTodos(value)
            }
            setIsLoading(false)
        })
    }

    const onCreateTodo = async (todo: Todo) => {
        if (sqliteConnection) {
            await createTodo(sqliteConnection, todo)
            updateTodos(sqliteConnection)
        }
    }

    const onDeleteTodo = async (todo: Todo) => {
        if (sqliteConnection) {
            await deleteTodo(sqliteConnection, todo.id)
            updateTodos(sqliteConnection)
        }
    }

    const onUpdateTodo = async (todo: Todo) => {
        if (sqliteConnection) {
            await updateTodo(sqliteConnection, todo)
            updateTodos(sqliteConnection)
        }
    }

    const handleCheckedChange = async (todo: Todo) => {
        if (sqliteConnection) {
            console.log("handle")
            var newTodo: Todo = {
                id: todo.id,
                title: todo.title,
                dueDate: todo.dueDate,
                completed: !todo.completed
            }
            var res = await updateTodo(sqliteConnection, newTodo)
            console.log(JSON.stringify(res))
            updateTodos(sqliteConnection)
        }

    }

    if (isLoading) return <LoadingScreen />

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {todos.map(todo => {
                        return <TodoListItem todo={todo} onLongPress={() => selectTodo(todo)} onCheckedChange={() => { handleCheckedChange(todo) }} />
                    })}
                </IonList>
                <IonFab onClick={() => setPresentCreateDialog(true)} style={{ position: 'absolute', right: 25, bottom: 25 }}>
                    <IonFabButton>
                        <IonIcon icon={add} color="white" size="24" />
                    </IonFabButton>
                </IonFab>
                <CreateTodoDialog isOpen={presentCreateDialog} setIsOpen={setPresentCreateDialog} onCreate={onCreateTodo} />
                <UpdateTodoDialog onDismiss={() => { selectTodo(undefined) }} todo={selectedTodo} onUpdate={onUpdateTodo} onDelete={onDeleteTodo} />
            </IonContent>
        </IonPage >
    )
}

export default TodosScreen