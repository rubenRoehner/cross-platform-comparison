import { ListItem } from "@rneui/base"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { Chip, Text } from "@rneui/themed";

export interface ListItemData { title: string, description: string, price: string, material: string, index: number }

const ProductListItem = (itemData: ListItemData) => {
    return (
        <ListItem bottomDivider>
            <ListItemContent>
                <ListItem.Title>
                    {itemData.title}
                </ListItem.Title>
                <ListItemSubtitle>
                    {itemData.material.toUpperCase()}
                </ListItemSubtitle>
                <ListItemContent>
                    <Text>
                        {itemData.description}
                    </Text>
                </ListItemContent>
            </ListItemContent>
            <Chip> <Text>{itemData.price} € </Text></Chip>
        </ListItem>
    );
}

export default ProductListItem