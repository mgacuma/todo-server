import { Endpoint } from "../../models/Endpoint.type";
import { todosStore } from "../../datastore/TodosStore";

export const getTodosUrl : string = '/todos/get-todos';

const getTodosEndpointHandler = async (req, res, next) => {
    res.send(await todosStore.getTodos());
};

export const getTodosEndpoint: Endpoint = {
    url: getTodosUrl,
    method: 'post',
    handler: getTodosEndpointHandler
}