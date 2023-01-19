import { CapacitorHttp } from "@capacitor/core";
import { isUser, User, isName, isAddress, isGeolocation } from "../models/User";

const baseURL = "https://fakestoreapi.com";
const userEndpoint = "/users";

export async function fetchAllUser(): Promise<User[] | null> {
    const options = {
        url: baseURL + userEndpoint
    }
    const response = await CapacitorHttp.get(options)
    var isValid = true
    response.data.map((userObject: any) => {
        isValid = isUser(userObject) && isAddress(userObject.address) && isName(userObject.name) && isGeolocation(userObject.address.geolocation)

    })
    if (isValid) {
        return response.data
    } else {
        return null
    }
}