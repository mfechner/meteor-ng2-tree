import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { CategoriesCollection } from "../../../../both/collections/categories.collection";
import { Categories } from "../../../../both/models/categories.model";

@Injectable()
export class CategoriesDataService {
    data: ObservableCursor<Categories>;

    constructor() {}

    public getData(id: string[] = ["ROOT_NODE"]): ObservableCursor<Categories> {
        //console.log("Get ROOT_NODE with _id $in: ", id);
        this.data = CategoriesCollection.find({_id: { $in: id}});
        return this.data;
    }

    // Add index to children

    public addNode(parentNode, node) {
        // db.categories.insert({node})
        // db.categories.update({parentNode}, {$addToSet: {children: 'node._id'}})
        CategoriesCollection.insert(node);
        if(!parentNode._id) {
            parentNode._id = "ROOT_NODE";
        }
        CategoriesCollection.update({_id: parentNode._id}, {$addToSet: {children: node._id}});
    }

    public removeNode(parentNode, node) {
        // db.categories.update({parentNode}, {$pull: {children: 'node._id}})
        // db.categories.remove({node})
        if(!node && !node._id) {
            console.log("No _id defined.", parentNode, node);
            return;
        }
        if(!parentNode._id) {
            parentNode._id = "ROOT_NODE";
        }

        // check if we need to delete recursive
        if(node.children.length > 0) {
            // we need to copy the array, else we get a race condition as _id are removed by recursively called removeNode
            let children = new Array(node.children[0]);
            children.forEach( id => {
                this.removeNode(node, CategoriesCollection.findOne({_id: id}));
            })
        }
        CategoriesCollection.update({_id: parentNode._id}, {$pull: {children: node._id}});
        CategoriesCollection.remove({_id: node._id});
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

    public rearrangeNode(oldParentNode, newParentNode, node) {
        // if (oldParentNode == newParentNode) {
            // rearrange order under the same parent
            // db.categories.update({parentNode}, {$set: {"childs.1": 'LG', "childs.3": 'Other position'}})
        // } else {
            // Moving the node
            // db.categories.update({newParentNode}, {$addToSet: {children: "node._id"}})
            // db.categories.update({oldParentNode}, {$pull: {children: "node._id"}})
        // }
    }

    public getAllDescendants() {
        /*
        var decendants = [];
        var stack = [];
        var item = db.categories.findOne({_id: "Foo"});
        stack.push(item);
        while (stack.length > 0) {
            var currentNode = stack.pop();
            var children = db.categories.find({_id: {$in: currentNode.children}});

            while(true === children.hasNext()) {
                var child = children.next();
                descendants.push(child._id);
                if(child.children.length > 0) {
                    stack.push(child);
                }
            }
         }
         descendants.join(",");
         */
    }

    public getPath(node) {
        /*
        var path = [];
        var item = db.categories.findOne(node);
        while ((item=db.categories.findOne({children: item._id}))) {
            path.push(item._id);
        }
        path.reverse().join(" / ");
        */
    }
}