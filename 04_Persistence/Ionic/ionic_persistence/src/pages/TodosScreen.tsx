import { useIonToast, IonPage, IonContent, IonList, IonFab, IonFabButton, IonIcon, IonModal, IonInput, IonRow, IonButton, IonItem, IonPopover, IonDatetime } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState, useRef, useEffect } from "react";
import { SQLiteDBConnection } from "react-sqlite-hook";
import CreateTodoDialog from "../components/CreateTodoDialog";
import TodoListItem from "../components/TodoListItem";
import UpdateTodoDialog from "../components/UpdateTodoDialog";
import { createTodo, getAllTodos, initdb } from "../data/database/DatabaseHandler";
import { Todo } from "../data/models/Todo";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";

const TodosScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [presentCreateDialog, setPresentCreateDialog] = useState(false)
    const [presentUpdateDialog, setPresentUpdateDialog] = useState(false)
    const [selectedTodo, selectTodo] = useState<Todo | null>(null)

    const [sqliteConnection, setSqliteConnection] = useState<SQLiteDBConnection | undefined>()

    const [present] = useIonToast()

    const presentToast = (message: string) => {
        present({
            message: message,
            duration: 1500,
            position: 'bottom'
        });
    };

    useEffect(() => {
        console.log("init")
        initdb().then((connection) => {
            console.log("init con" + connection)
            if (connection) {
                updateTodos(connection)
            }
        })
    }, [])

    const updateTodos = (connection: SQLiteDBConnection) => {
        // setIsLoading(true)
        getAllTodos(connection).then((value) => {
            console.log("get all")
            console.log(JSON.stringify(value))
            if (value != undefined) {
                setTodos(value)
            }
            setIsLoading(false)
        })
    }

    const onCreateTodo = async (todo: Todo) => {
        console.log("new Todo")
        if (sqliteConnection) {
            var results = await createTodo(sqliteConnection, todo)
            console.log(JSON.stringify(results))
            updateTodos(sqliteConnection)
        }
    }

    const onDeleteTodo = (todo: Todo) => {

    }

    const onUpdateTodo = (todo: Todo) => {

    }

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {todos.map(todo => {
                        return <TodoListItem todo={todo} onLongPress={() => setPresentUpdateDialog(true)} />
                    })}
                </IonList>
                <IonFab onClick={() => setPresentCreateDialog(true)} style={{ position: 'absolute', right: 25, bottom: 25 }}>
                    <IonFabButton>
                        <IonIcon icon={add} color="white" size="24" />
                    </IonFabButton>
                </IonFab>
                <CreateTodoDialog isOpen={presentCreateDialog} setIsOpen={setPresentCreateDialog} onCreate={onCreateTodo} />
                <UpdateTodoDialog isOpen={presentUpdateDialog} setIsOpen={setPresentUpdateDialog} todo={selectedTodo} onUpdate={onUpdateTodo} />
            </IonContent>
        </IonPage >
    )
}

export default TodosScreen