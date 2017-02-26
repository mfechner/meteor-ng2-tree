import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { CategoriesCollection } from "../../../../both/collections/categories.collection";
import { Categories } from "../../../../both/models/categories.model";

@Injectable()
export class CategoriesDataService {
    data: ObservableCursor<Categories>;

    constructor() {}

    public getData(id: string[] = ["ROOT_NODE"]): ObservableCursor<Categories> {
        console.log("Get Data with _id $in: ", id);
        this.data = CategoriesCollection.find({_id: { $in: id}});
        return this.data;
    }

    // Add index to children

    public insert(node) {
        console.log("Insert", node);
        CategoriesCollection.insert(node);
        console.log("Insert done.");
    }

    public update(node, query) {
        console.log("Update", node, "with", query);
        CategoriesCollection.update(node, query);
        console.log("Update done.");
    }

    public remove(node) {
        console.log("delete", node);
        CategoriesCollection.remove(node);
        console.log("delete done.");
    }

    public findOne(query) {
        return CategoriesCollection.findOne(query);
    }

    public updateNode(parentNode, oldNode, newNode) {
        if(oldNode._id == newNode._id) {
            // we need to create a new node
            // add newNode to parentNode

            // remove oldNode from parentNode
            // delete oldNode
        } else {
            // we just change data in the node
            // db.categories.update({oldNode}, {$set: {newNode}})
        }
    }


}