import { CapacitorHttp } from "@capacitor/core";
import { isCart, Cart, isCartEntry } from "../models/Cart";

const baseURL = "https://fakestoreapi.com";
const cartsEndpoint = "/carts";

export async function fetchAllCarts(): Promise<Cart[] | null> {
    const options = {
        url: baseURL + cartsEndpoint
    }
    const response = await CapacitorHttp.get(options)
    var isValid = true
    response.data.map((cartObject: any) => {
        isValid = isCart(cartObject)
        cartObject.products.map((cartEntryObject: any) => {
            isValid = isCartEntry(cartEntryObject)
        })
    })
    if (isValid) {
        return response.data
    } else {
        return null
    }
}