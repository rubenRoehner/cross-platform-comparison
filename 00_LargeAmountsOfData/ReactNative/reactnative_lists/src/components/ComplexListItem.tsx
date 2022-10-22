import { ListItem } from "@rneui/base"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemData } from "./SimpleListItem"

const ComplexListItem = (itemData: ListItemData) => {
    return (
        <ListItem bottomDivider>
            <ListItemContent>
                <ListItem.Title>
                    {itemData.title}
                </ListItem.Title>
                <ListItemSubtitle>
                    {itemData.paragraph}
                </ListItemSubtitle>
            </ListItemContent>
            <ListItem.Chevron />
        </ListItem>
    );
}

export default ComplexListItem