import { useEffect, useState } from "react"
import ErrorScreen from "./ErrorScreen"
import LoadingScreen from "./LoadingScreen"
import { Card, Chip, FAB, Icon, Image } from "@rneui/themed"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import Snackbar from "react-native-snackbar"
import { Todo } from "../data/Todo"
import TodoListitem from "../components/TodoItem"
import CreateTodoDialog from "../components/CreateTodoDialog"
import UpdateTodoDialog from "../components/UpdateTodoDialog"
import { createTable, deleteTodo, getAllTodos, getDatabaseConnection, insertTodo, updateTodo } from "../data/DatabaseHandler"
import { SQLiteDatabase } from "react-native-sqlite-storage"

const ProductsScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [showCreateDialog, setCreateDialogVisible] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>()

    const [databse, setDatabase] = useState<SQLiteDatabase | undefined>()

    useEffect(() => {
        setIsLoading(true)
        getDatabaseConnection().then((db) => {
            setDatabase(db)
            createTable(db).then(() => {
                getAllTodos(db).then((result) => {
                    setTodos(result)
                    console.log(JSON.stringify(result))
                    setIsLoading(false)
                })
            })
        })
    }, [])

    const toggleCreateDialog = () => {
        setCreateDialogVisible(!showCreateDialog)
    }

    const toggleUpdateDialog = (todo: Todo | undefined) => {
        setSelectedTodo(todo)
    }

    const addNewTodo = (todo: Todo) => {
        toggleCreateDialog()
        if (databse) {
            setIsLoading(true)
            insertTodo(databse, todo).then(() => {
                getAllTodos(databse).then((result) => {
                    setTodos(result)
                    setIsLoading(false)
                })
            })
        }
    }

    const handleCheckedChange = (todo: Todo) => {
        var newTodo: Todo = {
            id: todo.id,
            title: todo.title,
            completed: !todo.completed,
            dueDate: todo.dueDate
        }
        onUpdateTodo(newTodo)
    }

    const onUpdateTodo = (todo: Todo) => {
        toggleUpdateDialog(undefined)
        if (databse) {
            setIsLoading(true)
            updateTodo(databse, todo).then(() => {
                getAllTodos(databse).then((result) => {
                    setTodos(result)
                    setIsLoading(false)
                })
            })
        }
    }

    const onDeleteTodo = (todo: Todo) => {
        toggleUpdateDialog(undefined)
        if (databse) {
            setIsLoading(true)
            deleteTodo(databse, todo.id).then(() => {
                getAllTodos(databse).then((result) => {
                    setTodos(result)
                    setIsLoading(false)
                })
            })
        }
    }

    const handleLongPress = (todo: Todo) => {
        setSelectedTodo(todo)
        toggleUpdateDialog(todo)
    }

    if (hasError) return <ErrorScreen />

    if (isLoading) return <LoadingScreen />

    return (
        <>
            <FlatList
                data={todos}
                renderItem={({ item }) => TodoListitem({ todo: item, onLongPress: () => { handleLongPress(item) }, onCompletedChange: () => { handleCheckedChange(item) } })} />
            <FAB style={styles.fabStyle} color="dodgerblue" onPress={toggleCreateDialog}><Icon name="add" color="white" /></FAB>
            <CreateTodoDialog isVisible={showCreateDialog} dismissDialog={toggleCreateDialog} onCreate={addNewTodo} />
            <UpdateTodoDialog todo={selectedTodo} dismissDialog={() => toggleUpdateDialog(undefined)} onUpdate={onUpdateTodo} onDelete={onDeleteTodo} />
        </>
    )
}
const styles = StyleSheet.create({
    fabStyle: {
        position: 'absolute',
        bottom: 25,
        right: 25,
    }
});

export default ProductsScreen