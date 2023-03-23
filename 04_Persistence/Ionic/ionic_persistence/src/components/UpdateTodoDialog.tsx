import { IonModal, IonInput, IonItem, IonPopover, IonDatetime, IonRow, IonButton } from "@ionic/react";
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Todo } from "../data/models/Todo"

import './CreateTodoDialog.css';

const UpdateTodoDialog = (props: { onDismiss(): void, todo: Todo | undefined, onUpdate(todo: Todo): void, onDelete(todo: Todo): void }) => {

    const [title, setTitle] = useState(props.todo?.title ?? "");
    const [due, setDue] = useState(props.todo?.dueDate ?? new Date(Date.now()));

    const [presentDatePicker, setPresentDatePicker] = useState(false);

    useEffect(() => {
        if (props.todo?.dueDate !== undefined) {
            setTitle(props.todo.title)
            setDue(props.todo.dueDate)
        }
    }, [props.todo])

    const onChangeTitle = (value: string | number | null | undefined) => {
        if (typeof value === "string") {
            setTitle(value)
        }
    }

    const onChangeDue = (value: string | string[] | null | undefined) => {
        if (typeof value === "string") {
            setDue(parseISO(value))
        }
    }

    const onUpdate = () => {
        props.onDismiss()
        var todo: Todo = {
            id: props.todo?.id ?? 0,
            title: title,
            dueDate: due,
            completed: props.todo?.completed ?? false
        }
        props.onUpdate(todo)
    }

    const onDelete = () => {
        if (props.todo !== undefined) {
            props.onDelete(props.todo)
        }
        onDismiss()
    }

    const onDismiss = () => {
        resetValues()
        props.onDismiss()
    }

    const resetValues = () => {
        setTitle("")
        setDue(new Date(Date.now()))
    }

    return (
        <>
            <IonModal id="modalDialog" isOpen={props.todo !== undefined} onDidDismiss={() => { onDismiss() }}>
                <div style={{ margin: 16 }}>
                    <IonInput placeholder="title" value={title} onIonChange={(element) => { onChangeTitle(element.target.value) }} />
                    <IonItem>
                        <IonInput value={due.toLocaleDateString()} onClick={() => { setPresentDatePicker(true) }} readonly />
                        <IonPopover isOpen={presentDatePicker} onDidDismiss={() => setPresentDatePicker(false)} defaultValue={due.toISOString()} >
                            <IonDatetime presentation="date" onIonChange={(event) => { onChangeDue(event.target.value) }} showDefaultButtons />
                        </IonPopover>
                    </IonItem>
                    <IonRow>
                        <IonButton onClick={onDelete}>delete</IonButton>
                        <IonButton onClick={onUpdate}>update</IonButton>
                    </IonRow>
                </div>
            </IonModal>
        </>
    );
}

export default UpdateTodoDialog