import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";

import template from "./treeview.component.html";
import style from "./treeview.component.scss";

import { CategoriesDataService } from "../categories/categories.service";
@Component({
    selector: "app-treeview",
    template,
    styles: [ style ]
})
export class TreeviewComponent implements OnInit, OnDestroy {
    @Input() subNodes: string[];
    @Input() dataService: any;
    @Input() config: any;
    nodes: any[];
    icon: string;
    nodesSubscription: any;

    constructor() {}

    ngOnInit() {
        console.log("TreeviewComponent in ngOnInit, root is:", this.subNodes);
        console.log("dataService", this.dataService);
        console.log("Config", this.config);
        this.icon = this.getIcon(null);
        this.nodesSubscription = this.dataService.getData(this.subNodes).subscribe(nodes => {
            // Should we hide the root node?
            this.nodes = nodes;
            console.log("Node", nodes);
                if(!this.config.showRootNode) {
                    this.toggle(nodes);
                }

        });
    }

    ngOnDestroy() {
        this.nodesSubscription.unsubscribe();
    }

    toggle(node) {
        node.expanded = !node.expanded;
        this.icon = this.getIcon(node);
    }

    getIcon(node) {
        if(node && node.children && node.children.length > 0) {
            if(node.expanded) {
                return "-";
            } else {
                return "+";
            }
        }
        return "";
    }

}