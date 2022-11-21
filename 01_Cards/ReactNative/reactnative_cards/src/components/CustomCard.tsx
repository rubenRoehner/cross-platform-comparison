import { Image, Text } from '@rneui/base';
import { Card } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItemData } from '../screens/MainScreen';

export interface CustomCardData extends ListItemData { title: string, subtitle: string, label: string, imgUrl: string }

const cardStyles = StyleSheet.create({
    container: {
        aspectRatio: 2 / 3, margin: 0, display: 'flex', flexDirection: "column", flexGrow: 1
    },
    image: {
        flex: 1,
        height: 300
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        fontSize: 14
    },
    label: {
        fontSize: 12
    }
})

const CustomCard = (data: CustomCardData) => {
    return (
        <Card containerStyle={cardStyles.container}>
            <Image style={cardStyles.image} source={{ uri: data.imgUrl }} />
            <Text style={cardStyles.title} numberOfLines={1}>{data.title}</Text>
            <Text style={cardStyles.subtitle} numberOfLines={2}>{data.subtitle}</Text>
            <Text style={cardStyles.label} numberOfLines={1}>{data.label}</Text>
        </Card>
    )
}

export default CustomCard