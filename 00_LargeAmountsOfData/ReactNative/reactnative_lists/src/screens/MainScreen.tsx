import { SearchBar } from "@rneui/themed";
import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text } from "react-native";
import ComplexListItem from "../components/ComplexListItem";
import SimpleListItem, { ListItemData } from "../components/SimpleListItem";
import mockData from "../data/MockData_25.json"

const showSimpleListItem = false

export default class MainScreen extends React.Component {

    state = {
        searchValue: "",
        listItems: mockData
    }

    getListItems(searchValue: string) {
        return mockData.filter((itemData) => itemData.title.toLowerCase().includes(searchValue.toLowerCase()) || itemData.description.toLowerCase().includes(searchValue.toLowerCase()))
    }

    renderItem(itemData) {
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
        const { searchValue, listItems } = this.state
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