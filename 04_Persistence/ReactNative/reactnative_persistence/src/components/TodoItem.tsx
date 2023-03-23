import { Card, CheckBox } from "@rneui/themed";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Todo } from "../data/Todo";


const TodoListitem = (props: { todo: Todo, onLongPress(): void, onCompletedChange(): void }) => {
    return (
        <Pressable onLongPress={props.onLongPress}>
            <Card key={props.todo.id} containerStyle={styles.cardStyle} wrapperStyle={styles.cardWrapper}>
                <View style={styles.textContainer}>
                    <Text style={styles.titleStyle}>{props.todo.title}</Text>
                    <View style={{ height: 8 }} />
                    <Text style={styles.subtitleStyle}>{props.todo.dueDate.toLocaleString()}</Text>
                </View>
                <CheckBox checked={props.todo.completed} onPress={props.onCompletedChange} />
            </Card>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    productImageStyle: {
        height: 150,
    },
    titleStyle: {
        fontSize: 16
    },
    subtitleStyle: {
        lineClamp: 3,
        WebkitLineClamp: 3,
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: 16,
        maxHeight: 48
    },
    bottomSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    categoryLabelStyle: {
        textTransform: "uppercase"
    },
    cardStyle: {
        borderWidth: 0,
        borderRadius: 6,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    textContainer: {
        flex: 1
    },
    fabStyle: {
        position: 'absolute',
        bottom: 25,
        right: 25,
    }
});

export default TodoListitem