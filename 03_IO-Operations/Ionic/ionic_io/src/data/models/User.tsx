export type User = {
    id: number,
    email: string,
    phone: string,
    username: string,
    password: string,
    name: Name,
    address: Address
}

export function isUser(object: any): object is User {
    return "id" in object && "email" in object && "phone" in object && "username" in object && "password" in object && "name" in object && "address" in object
}

export type Name = {
    firstname: string,
    lastname: string
}

export function isName(object: any): object is Name {
    return "firstname" in object && "lastname" in object
}

export type Address = {
    city: string,
    street: string,
    number: number,
    zipcode: string,
    geolocation: Geolocation
}

export function isAddress(object: any): object is Address {
    return "city" in object && "street" in object && "number" in object && "zipcode" in object && "geolocation" in object
}

export type Geolocation = {
    lat: string,
    long: string
}

export function isGeolocation(object: any): object is Geolocation {
    return "lat" in object && "long" in object
}