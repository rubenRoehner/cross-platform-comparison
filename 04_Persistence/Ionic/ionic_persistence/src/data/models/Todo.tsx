export type Todo = {
    id: number | null,
    title: string,
    due: Date,
    done: boolean
}


export function isTodo(object: any): object is Todo {
    return "id" in object && "title" in object && "due" in object && "done" in object
}