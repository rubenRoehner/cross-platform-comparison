import { Dialog } from "@rneui/themed";
import React, { useEffect } from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { Todo } from "../data/Todo";

const UpdateTodoDialog = (props: { todo: Todo | undefined, dismissDialog(): void, onUpdate(todo: Todo): void, onDelete(todo: Todo): void }) => {

    const [title, onChangeTitle] = React.useState(props.todo?.title ?? "");
    const [due, onChangeDue] = React.useState(props.todo?.dueDate ?? new Date(Date.now()))
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        if (props.todo?.dueDate != undefined) {
            onChangeTitle(props.todo.title)
            onChangeDue(props.todo.dueDate)
        }
    }, [props.todo])

    return (
        <Dialog
            isVisible={props.todo != undefined}
            onBackdropPress={props.dismissDialog}
        >
            <Dialog.Title title="Select Preference" />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="title"
            />
            <TouchableOpacity onPress={() => { setOpen(true) }}>
                <TextInput
                    style={styles.textInput}
                    value={due.toString()}
                    placeholder="due"
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={due}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    onChangeDue(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <Dialog.Actions>
                <Dialog.Button
                    title="update"
                    onPress={() => {
                        const todo = {
                            id: props.todo?.id ?? 0, title: title, dueDate: due, completed: props.todo?.completed ?? false
                        }
                        props.onUpdate(todo);
                    }}
                />
                <Dialog.Button title="delete" onPress={() => { if (props.todo) props.onDelete(props.todo) }} />
            </Dialog.Actions>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default UpdateTodoDialog