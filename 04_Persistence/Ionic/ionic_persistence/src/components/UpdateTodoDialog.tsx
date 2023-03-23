import { IonModal, IonInput, IonItem, IonPopover, IonDatetime, IonRow, IonButton } from "@ionic/react";
import { parseISO } from "date-fns";
import { useState } from "react";
import { Todo } from "../data/models/Todo"

import './CreateTodoDialog.css';

const UpdateTodoDialog = (props: { isOpen: boolean, setIsOpen(value: boolean): void, todo: Todo | null, onUpdate(todo: Todo): void }) => {

    const [title, setTitle] = useState(props.todo?.title ?? "");
    const [due, setDue] = useState(props.todo?.due ?? new Date(Date.now()));

    const [presentDatePicker, setPresentDatePicker] = useState(false);

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
        props.setIsOpen(false)
        var todo: Todo = {
            id: props.todo?.id ?? null,
            title: title,
            due: due,
            done: props.todo?.done ?? false
        }
        props.onUpdate(todo)
    }

    const onDismiss = () => {
        resetValues()
        props.setIsOpen(false)
    }

    const resetValues = () => {
        setTitle("")
        setDue(new Date(Date.now()))
    }

    return (
        <>
            <IonModal id="modalDialog" isOpen={props.isOpen} onDidDismiss={() => { onDismiss() }}>
                <div style={{ margin: 10 }}>
                    <IonInput placeholder="title" value={title} onIonChange={(element) => { onChangeTitle(element.target.value) }} />
                    <IonItem>
                        <IonInput value={due.toLocaleDateString()} onClick={() => { setPresentDatePicker(true) }} readonly />
                        <IonPopover isOpen={presentDatePicker} onDidDismiss={() => setPresentDatePicker(false)} defaultValue={due.toISOString()} >
                            <IonDatetime presentation="date" onIonChange={(event) => { onChangeDue(event.target.value) }} showDefaultButtons />
                        </IonPopover>
                    </IonItem>
                    <IonRow>
                        <IonButton onClick={() => { onDismiss() }}>cancel</IonButton>
                        <IonButton onClick={onUpdate}>create</IonButton>
                    </IonRow>
                </div>
            </IonModal>
        </>
    );
}

export default UpdateTodoDialog