export type Cart = {
    id: number,
    userId: number,
    date: string,
    products: [CartEntry]
}


export function isCart(object: any): object is Cart {
    return "id" in object && "userId" in object && "date" in object && "products" in object
}

export type CartEntry = {
    productId: number,
    quantity: number
}


export function isCartEntry(object: any): object is CartEntry {
    return "productId" in object && "quantity" in object
}