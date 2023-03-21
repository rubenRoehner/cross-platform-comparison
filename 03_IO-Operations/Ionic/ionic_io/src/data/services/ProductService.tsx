import { CapacitorHttp } from "@capacitor/core";
import { isProduct, Product } from "../models/Product";

const baseURL = "https://fakestoreapi.com";
const productsEndpoint = "/products";

export async function fetchAllProducts(): Promise<Product[] | null> {
    const options = {
        url: baseURL + productsEndpoint
    }
    const response = await CapacitorHttp.get(options)
    var isValid = true
    response.data.map((value: any) => {
        isValid = isProduct(value)
    })
    if (isValid) {
        return response.data
    } else {
        return null
    }
}

export async function addNewProduct(product: Product): Promise<number | null> {
    const options = {
        url: baseURL + productsEndpoint,
        body: JSON.stringify(product)
    }
    const response = await CapacitorHttp.post(options)
    if ("id" in response.data) {
        return response.data.id
    } else {
        return null
    }
}

export async function deleteProduct(product: Product): Promise<number | null> {
    const options = {
        url: baseURL + productsEndpoint + "/" + product.id
    }
    const response = await CapacitorHttp.delete(options)
    if ("id" in response.data) {
        return response.data.id
    } else {
        return null
    }
}