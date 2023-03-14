import { SearchBar } from "@rneui/themed";
import React from "react";
import { FlatList, Platform, SafeAreaView } from "react-native";
import ComplexListItem, { ListItemData } from "../components/ListItem";
import mockData from "../data/MockData_1000.json"

export default class MainScreen extends React.Component {

    state = {
        searchValue: ""
    }

    getListItems(searchValue: string) {
        return mockData.filter((itemData) => itemData.title.toLowerCase().includes(searchValue.toLowerCase()) || itemData.description.toLowerCase().includes(searchValue.toLowerCase()))
    }

    renderItem(itemData: ListItemData) {
        return ComplexListItem(itemData)
    }

    updateSearch = (searchValue: string) => {
        this.setState({ searchValue })
    }

    render() {
        const { searchValue } = this.state
        let platform: "default" | "android" | "ios" | undefined = "default"
        if (Platform.OS === "android") {
            platform = "android"
        }
        if (Platform.OS === "ios") {
            platform = "ios"
        }
        return (
            <SafeAreaView>
                <SearchBar value={searchValue} onChangeText={this.updateSearch} platform={platform} />
                <FlatList
                    data={this.getListItems(searchValue)}
                    renderItem={({ item, index }) => this.renderItem({ ...item, index })}
                />
            </SafeAreaView >
        );
    }
}