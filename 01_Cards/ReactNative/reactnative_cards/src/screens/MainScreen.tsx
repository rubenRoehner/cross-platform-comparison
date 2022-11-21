import React from "react";
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, VirtualizedList } from "react-native";
import CustomCard, { CustomCardData } from "../components/CustomCard";
import HorizontalScrollView, { HorizontalScrollViewData } from "../components/HorizontalScrollView";

const mockData: CustomCardData[] = [
    { title: "First Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../public/assets/images/ionic_logo.png" },
    { title: "Second Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Third Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Fourth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Fifth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Sixth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Seventh Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
];

const listItemData: ListItemData[] = [
    { sectionTitle: "Products" },
    { title: "First Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../public/assets/images/ionic_logo.png" },
    { title: "Second Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Third Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Fourth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Fifth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Sixth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Seventh Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { sectionTitle: "Gallery" },
    {
        items: [
            { title: "First Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../public/assets/images/ionic_logo.png" },
            { title: "Second Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
            { title: "Third Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
            { title: "Fourth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
            { title: "Fifth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
            { title: "Sixth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
            { title: "Seventh Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
        ],
    },
    { sectionTitle: "Services" },
    { title: "First Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../public/assets/images/ionic_logo.png" },
    { title: "Second Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Third Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Fourth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Fifth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Sixth Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" },
    { title: "Seventh Item", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corrupti natus nam minus. Explicabo totam impedit et est blanditiis nam harum modi doloribus sequi animi ad alias ex, sunt maxime!", label: "50", imgUrl: "../../assets/img/ionic_logo.png" }
]

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 24,
        marginBottom: 12
    }
})

const WIDTH = Dimensions.get('screen').width

export interface ListItemData { }

interface SectionTitleItemData extends ListItemData {
    sectionTitle: string
}

export default class MainScreen extends React.Component {

    renderItem(item: ListItemData, index: number) {
        if (this.isCustomCardData(item)) {
            var customCardData = item as CustomCardData
            return (<View key={index} style={{ width: 0.5 * WIDTH }}><CustomCard title={customCardData.title} subtitle={customCardData.subtitle} label={customCardData.label} imgUrl={customCardData.imgUrl} /></View>)
        } else if (this.isHorizontalScrollViewData(item)) {
            var horizontalScrollViewData = item as HorizontalScrollViewData
            return (<View key={index} style={{ width: WIDTH, height: 300 }}><HorizontalScrollView items={horizontalScrollViewData.items} /></View>)
        } else {
            var sectionTitleItemData = item as SectionTitleItemData
            return (<View key={index} style={{ width: WIDTH }}><Text>{sectionTitleItemData.sectionTitle}</Text></View>)
        }
    }

    isCustomCardData(item: ListItemData) {
        return item.hasOwnProperty("title") && item.hasOwnProperty("subtitle") && item.hasOwnProperty("imgUrl") && item.hasOwnProperty("label")
    }

    isHorizontalScrollViewData(item: ListItemData) {
        return item.hasOwnProperty("items")
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    horizontal={false}
                    contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                >
                    {
                        listItemData.map((item, index) => {
                            return this.renderItem(item, index)
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}