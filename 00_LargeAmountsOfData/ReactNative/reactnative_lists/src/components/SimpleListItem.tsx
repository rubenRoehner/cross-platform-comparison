import { ListItem } from "@rneui/themed";

export interface ListItemData { title: string, paragraph: string, index: number }

const SimpleListItem = (itemData: ListItemData) => {
    return (
        <ListItem bottomDivider>
            <ListItem.Title>
                {itemData.title}
            </ListItem.Title>
        </ListItem>
    );
}

export default SimpleListItem