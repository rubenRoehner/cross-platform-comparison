import { Dialog } from "@rneui/themed";
import React from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { Todo } from "../data/Todo";

const CreateTodoDialog = (props: { isVisible: boolean, dismissDialog(): void, onCreate(todo: Todo): void }) => {

    const [title, onChangeTitle] = React.useState('');
    const [due, onChangeDue] = React.useState(new Date(Date.now()))
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog
            isVisible={props.isVisible}
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
                    value={due.toLocaleDateString()}
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
                    title="create"
                    onPress={() => {
                        const todo = {
                            id: 0, title: title, dueDate: due, completed: false
                        }
                        props.onCreate(todo);
                    }}
                />
                <Dialog.Button title="cancel" onPress={props.dismissDialog} />
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

export default CreateTodoDialog