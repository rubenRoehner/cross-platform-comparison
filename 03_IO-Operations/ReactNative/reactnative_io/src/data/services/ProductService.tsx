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