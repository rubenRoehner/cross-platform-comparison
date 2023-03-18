import { Dialog } from "@rneui/themed";
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Product } from "../data/models/Product";

const CreatProductDialog = (props: { isVisible: boolean, dismissDialog(): void, onCreateProduct(product: Product): void }) => {

    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [priceString, onChangePrice] = React.useState('');

    return (
        <Dialog
            isVisible={props.isVisible}
            onBackdropPress={props.dismissDialog}
        >
            <Dialog.Title title="Select Preference" />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="title"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="description"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangePrice}
                value={priceString}
                placeholder="price"
                keyboardType="number-pad"
            />

            <Dialog.Actions>
                <Dialog.Button
                    title="create"
                    onPress={() => {
                        const id = 21 + Math.floor(Math.random() * 50);
                        const category = "default"
                        const image = "none"
                        const price = +priceString
                        const product = {
                            id, title, description, price, category, image
                        }
                        props.onCreateProduct(product);
                    }}
                />
                <Dialog.Button title="cancel" onPress={props.dismissDialog} />
            </Dialog.Actions>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default CreatProductDialog