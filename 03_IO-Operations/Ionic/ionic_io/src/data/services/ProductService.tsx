import { CapacitorHttp } from "@capacitor/core";
import { isProduct, Product } from "../models/Product";

const baseURL = "https://fakestoreapi.com";
const productsEndpoint = "/products";
const categoriesEndpoint = "/products/categories";

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

export async function fetchAllCategories(): Promise<string[] | null> {
    const options = {
        url: baseURL + categoriesEndpoint
    }
    const response = await CapacitorHttp.get(options)
    if (Array.isArray(response.data)) {
        return response.data.map((value) => value.toString())
    } else {
        return null
    }
}

export async function fetchOneProduct(): Promise<Product | null> {
    return fetchProductById(1)
}

export async function fetchProductById(id: number): Promise<Product | null> {
    const options = {
        url: baseURL + productsEndpoint + "/" + id
    }
    const response = await CapacitorHttp.get(options)
    if (isProduct(response.data)) {
        return response.data
    } else {
        return null
    }
}