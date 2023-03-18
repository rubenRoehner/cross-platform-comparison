import { isProduct, Product } from "../models/Product";

const baseURL = "https://fakestoreapi.com";
const productsEndpoint = "/products";

export async function fetchAllProducts(): Promise<Product[] | null> {
    return fetch(baseURL + productsEndpoint)
        .then(response => response.json())
        .then(json => {
            var isValid = true
            json.map((value: any) => {
                isValid = isProduct(value)
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

export async function addNewProduct(product: Product): Promise<Product | null> {
    const jsonBody = JSON.stringify(product)
    console.log("body: " + jsonBody)
    return fetch(baseURL + productsEndpoint, { method: 'POST', body: JSON.stringify(product) })
        .then(response => response.json())
        .then(json => {
            console.debug("add result: " + JSON.stringify(json))
            if ("id" in json) {
                return json
            } else {
                return null
            }
        })
}

export async function deleteProduct(product: Product): Promise<Product | null> {
    return fetch(baseURL + productsEndpoint + "/" + product.id, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => {
            if ("id" in json) {
                return json
            } else {
                return null
            }
        })
}