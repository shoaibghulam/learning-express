import { Router } from "express";
import { get,post,put,deleteCategory } from "../controllers/category.controller.js";

const categoryRoute=  Router();


categoryRoute.get('/',get);
categoryRoute.post('/',post);
categoryRoute.put('/:id',put);
categoryRoute.delete('/:id',deleteCategory);


export default categoryRoute;
