import { IonPopover, IonDatetime, IonModal, IonInput, IonItem, IonRow, IonButton } from "@ionic/react";
import { useState } from "react";
import { Todo } from "../data/models/Todo";
import { parseISO } from "date-fns"

import './CreateTodoDialog.css';

const CreateTodoDialog = (props: { isOpen: boolean, setIsOpen(value: boolean): void, onCreate(todo: Todo): void }) => {

    const [title, setTitle] = useState('');
    const [due, setDue] = useState(new Date(Date.now()));

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

    const onCreate = () => {
        props.setIsOpen(false)
        var todo: Todo = {
            id: 0,
            title: title,
            dueDate: due,
            completed: false
        }
        props.onCreate(todo)
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
                        <IonButton onClick={onCreate}>create</IonButton>
                    </IonRow>
                </div>
            </IonModal>
        </>
    );
}

export default CreateTodoDialog