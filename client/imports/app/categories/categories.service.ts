import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { CategoriesCollection } from "../../../../both/collections/categories.collection";
import { Categories } from "../../../../both/models/categories.model";

@Injectable()
export class CategoriesDataService {
    data: ObservableCursor<Categories>;

    constructor() {}

    public getData(id: string[] = ["ROOT_NODE"]): ObservableCursor<Categories> {
        console.log("Get ROOT_NODE with _id $in: ", id);
        this.data = CategoriesCollection.find({_id: { $in: id}});
        return this.data;
    }
}