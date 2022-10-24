import { SearchBar } from "@rneui/themed";
import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text } from "react-native";
import ComplexListItem from "../components/ComplexListItem";
import SimpleListItem, { ListItemData } from "../components/SimpleListItem";

const itemCount = 100;
const showSimpleListItem = false

export default class MainScreen extends React.Component {

    state = {
        searchValue: ''
    }

    getListItems(searchValue: string) {
        let items = []
        for (let i = 0; i < itemCount; i++) {
            items.push({ title: "Item no." + i, paragraph: "lorem ipsum dolor sit amet", index: i } as ListItemData)
        }
        return items.filter((itemData: ListItemData) => itemData.title.toLowerCase().includes(searchValue.toLowerCase()) || itemData.paragraph.toLowerCase().includes(searchValue.toLowerCase()))
    }

    renderItem(itemData: ListItemData) {
        if (showSimpleListItem) {
            return SimpleListItem(itemData)
        } else {
            return ComplexListItem(itemData)
        }
    }

    updateSearch = (searchValue: string) => {
        this.setState({ searchValue })
    }

    render() {
        const { searchValue } = this.state
        return (
            <SafeAreaView>
                <SearchBar value={searchValue} onChangeText={this.updateSearch} lightTheme></SearchBar>
                <FlatList
                    data={this.getListItems(searchValue)}
                    renderItem={({ item }) => this.renderItem(item)}
                />
            </SafeAreaView>
        );
    }
}