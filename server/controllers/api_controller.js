import {Controller} from "@projectinvicta/nails";
import Tool from '../models/Tool.js';

export default class ApiController extends Controller {
    json = true;
    routes = [
        ['get', './tools'],
        ['post', './createtool'],
    ];

    async createtool(params, request, response) {
        return await Tool.create(request.body);
    }

    async tools(params, request, response) {
        return await Tool.findAll();
    }


}