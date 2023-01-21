import { isUser, User, isName, isAddress, isGeolocation } from "../models/User";

const baseURL = "https://fakestoreapi.com";
const userEndpoint = "/users";

export async function fetchAllUser(): Promise<User[] | null> {
    return fetch(baseURL + userEndpoint)
        .then(response => response.json())
        .then(json => {
            var isValid = true
            json.map((value: any) => {
                isValid = isUser(value)
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