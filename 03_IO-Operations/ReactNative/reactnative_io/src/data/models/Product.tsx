export type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
}


export function isProduct(object: any): object is Product {
    return "id" in object && "title" in object && "price" in object && "description" in object && "image" in object && "category" in object
}