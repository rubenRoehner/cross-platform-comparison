import { FlatList, SafeAreaView, StatusBar, Text } from "react-native";
import ComplexListItem from "../components/ComplexListItem";
import SimpleListItem, { ListItemData } from "../components/SimpleListItem";

const itemCount = 100;
const showSimpleListItem = false

function getListItems() {
    let items = []
    for (let i = 0; i < itemCount; i++) {
        items.push({ title: "Item no." + i, paragraph: "lorem ipsum dolor sit amet", index: i } as ListItemData)
    }
    return items
}

function renderItem(itemData: ListItemData) {
    if (showSimpleListItem) {
        return SimpleListItem(itemData)
    } else {
        return ComplexListItem(itemData)
    }
}

const MainScreen = () => {
    return (
        <SafeAreaView>
            <FlatList
                data={getListItems()}
                renderItem={({ item }) => renderItem(item)}
            />
        </SafeAreaView>
    );
}

export default MainScreen