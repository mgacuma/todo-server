import { Endpoint } from "../../models/Endpoint.type";
import { todosStore } from "../../datastore/TodosStore";

export const upsertTodoUrl : string = '/todos/upsert-todo';

const upsertTodoEndpointHandler = async (req, res, next) => {
    const todo = req.body;
    res.send(await todosStore.upsertTodo(todo))
};

export const upsertTodoEndpoint: Endpoint = {
    url: upsertTodoUrl,
    method: 'post',
    handler: upsertTodoEndpointHandler
}