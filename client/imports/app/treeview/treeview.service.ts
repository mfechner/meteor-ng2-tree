import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { Treeview } from "../../../../both/models/treeview.model";
import { TreeviewCollection } from "../../../../both/collections/treeview.collection";


@Injectable()
export class TreeviewDataService {
    data: ObservableCursor<Treeview>;
    children: ObservableCursor<Treeview>;

    constructor() {
        this.data = TreeviewCollection.find({parent: null});
    }

    public getData(): ObservableCursor<Treeview> {
        return this.data;
    }

    public getChildren(id: string) {
        this.children = TreeviewCollection.find({parent: id});
        return this.children;
    }
}