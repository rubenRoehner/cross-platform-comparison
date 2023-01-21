import { isCart, Cart, isCartEntry } from "../models/Cart";

const baseURL = "https://fakestoreapi.com";
const cartsEndpoint = "/carts";

export async function fetchAllCarts(): Promise<Cart[] | null> {
    return fetch(baseURL + cartsEndpoint)
        .then(response => response.json())
        .then(json => {
            var isValid = true
            json.map((value: any) => {
                isValid = isCart(value)
            })
            if (isValid) {
                return json
            } else {
                return null
            }
        })
        .catch(error => {
            console.error(error);
            return null
        });
}