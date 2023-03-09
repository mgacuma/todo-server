import { todosStore } from "../../datastore/TodosStore";
import { Endpoint } from "../../models/Endpoint.type";

const deleteTodoUrl : string = '/todos/delete-todo';

const deleteTodoEndpointHandler = async (req, res, next) => {
    const todo = req.body;
    res.send(await todosStore.deleteTodo(todo))
};

export const deleteTodoEndpoint: Endpoint = {
    url: deleteTodoUrl,
    method: 'post',
    handler: deleteTodoEndpointHandler
}