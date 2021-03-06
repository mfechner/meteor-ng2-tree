import { MongoObservable } from "meteor-rxjs";
import { Categories } from "../models/categories.model";


export const CategoriesCollection = new MongoObservable.Collection<Categories>("categories");

function loggedIn() {
    return true;
}

CategoriesCollection.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});
