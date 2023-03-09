import { Endpoint } from "../models/Endpoint.type";
import { deleteTodoEndpoint } from "./todos/delete-todo";
import { getTodosEndpoint } from "./todos/get-todos";
import { toggleTodoEndpoint } from "./todos/toggle-todo";
import { upsertTodoEndpoint } from "./todos/upsert-todo";

export const endpoints: Endpoint[] = [
    getTodosEndpoint,
    upsertTodoEndpoint,
    deleteTodoEndpoint,
    toggleTodoEndpoint
]