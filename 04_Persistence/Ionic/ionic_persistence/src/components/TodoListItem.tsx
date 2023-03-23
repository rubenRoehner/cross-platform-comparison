import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCheckbox } from "@ionic/react";
import { Todo } from "../data/models/Todo";
import { useLongPress } from 'react-use'

const TodoListItem = (props: { todo: Todo, onLongPress(todo: Todo): void, onCheckedChange(): void }) => {
    const onLongPress = () => {
        props.onLongPress(props.todo)
    };

    const defaultOptions = {
        isPreventDefault: false,
        delay: 300,
    };
    const longPressEvent = useLongPress(onLongPress, defaultOptions);

    return (
        <IonCard {...longPressEvent} key={props.todo.id} style={cardWrapper}>
            <IonCardContent style={textContainer}>
                <IonCardTitle style={titleStyle}>{props.todo.title}</IonCardTitle>
                <IonCardSubtitle style={subtitleStyle}>{props.todo.dueDate.toLocaleDateString()}</IonCardSubtitle>
            </IonCardContent>
            <IonCheckbox checked={props.todo.completed} onClick={props.onCheckedChange} />
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

const cardWrapper = {
    display: "flex",
    flexDirection: 'row' as 'row',
    alignItems: "center",
    paddingRight: 12
}

const textContainer = {
    flex: 1
}

export default TodoListItem