import { Component, OnInit, OnDestroy } from "@angular/core";
import template from "./app.component.html";
import style from "./app.component.scss";
import { TreeNode } from "angular2-tree-component";
import { CategoriesDataService } from "./categories/categories.service";

@Component({
    selector: "app",
    template,
    styles: [ style ]
})
export class AppComponent implements OnInit, OnDestroy {
    nodes = [];

    options;
    nodesSubscription;

    constructor(private categoriesDataService: CategoriesDataService) {
        this.options = {
            getChildren: this.getChildren.bind(this),
        };

    }

    getChildren (node: TreeNode) {
        console.log("getChildren: Called with", node);

        return this.categoriesDataService.getData(node.data.childrenIds)
            .subscribe(res => {
                console.log("getChildren: In data subscribe");
                let children = [];
                for (let r of res) {
                    console.log("getChildren: Child in loop", r);
                    children.push(this.toNode(r));
                }
                console.log("getChildren: after loop", children);
                return children;
            });
    }


    ngOnInit() {
        console.log("In app.component ngOnInit");
        this.nodesSubscription = this.categoriesDataService.getData()
            .subscribe(res => {
                console.log("ngOnInit Subscription", res);
                this.nodes.push(this.toNode(res[0]));
                console.log("Transformed nodes to", this.nodes);
            });
        console.log("Finished ngOnInit");
    }

    ngOnDestroy() {
        this.nodesSubscription.unsubscribe();
    }

    toNode(dataset) {
        console.log("toNode with ", dataset);
        //console.log("Length: ", dataset.children.length);
        return {
            id: dataset._id,
            name: dataset._id,
            hasChildren: dataset.childrenIds.length > 0 ? true : false,
            childrenIds: dataset.childrenIds,
            children: []
        };
    }
}
