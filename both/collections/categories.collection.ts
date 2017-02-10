import { MongoObservable } from "meteor-rxjs";
import { Categories } from "../models/categories.model";


export const CategoriesCollection = new MongoObservable.Collection<Categories>("categories");