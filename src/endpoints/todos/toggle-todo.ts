import { todosStore } from "../../datastore/TodosStore";
import { Endpoint } from "../../models/Endpoint.type";

export const toggleTodoUrl : string = '/todos/toggle-todo';

const toggleTodoEndpointHandler = async (req, res, next) => {
    const todo = req.body;
    res.send(await todosStore.toggleTodo(todo));
};

export const toggleTodoEndpoint: Endpoint = {
    url: toggleTodoUrl,
    method: 'post',
    handler: toggleTodoEndpointHandler
}