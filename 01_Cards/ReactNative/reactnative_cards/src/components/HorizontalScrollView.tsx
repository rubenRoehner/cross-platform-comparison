import React from "react";
import { FlatList } from "react-native";
import { ListItemData } from "../screens/MainScreen";
import CustomCard, { CustomCardData } from "./CustomCard";

export interface HorizontalScrollViewData extends ListItemData { items: CustomCardData[] }


const HorizontalScrollView = (data: HorizontalScrollViewData) => {
    return (
        <FlatList
            data={data.items}
            renderItem={({ item }) => (<CustomCard title={item.title} subtitle={item.subtitle} label={item.label} imgUrl={item.imgUrl} />)}
            horizontal
            nestedScrollEnabled
        />
    )
}

export default HorizontalScrollView