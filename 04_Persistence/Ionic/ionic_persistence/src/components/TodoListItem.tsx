import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import { Todo } from "../data/models/Todo";
import { useLongPress } from 'react-use'

const TodoListItem = (props: { todo: Todo, onLongPress(todo: Todo): void }) => {
    const onLongPress = () => {
        props.onLongPress(props.todo)
    };

    const defaultOptions = {
        isPreventDefault: true,
        delay: 300,
    };
    const longPressEvent = useLongPress(onLongPress, defaultOptions);

    return (
        <IonCard className="productCard" {...longPressEvent}>
            <IonCardContent>
                <IonCardTitle style={titleStyle}>{props.todo.title}</IonCardTitle>
                <div style={{ height: "8px" }} />
                <IonCardSubtitle style={subtitleStyle}>{props.todo.due.toLocaleDateString()}</IonCardSubtitle>
            </IonCardContent>
        </IonCard>
    )
}

const titleStyle = {
    fontSize: "16px"
}

const subtitleStyle = {
    lineClamp: 3,
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "16px",
    maxHeight: "48px"
}

export default TodoListItem