export type Todo = {
    id: number,
    title: string,
    dueDate: Date,
    completed: boolean
}


export function isTodo(object: any): object is Todo {
    return "id" in object && "title" in object && "dueDate" in object && "completed" in object
}