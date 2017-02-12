import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import template from "./treeview.component.html";
import style from "./treeview.component.scss";

import { TreeviewConfig } from "./treeviewconfig.model";

@Component({
    selector: "app-treeview",
    template,
    styles: [ style ]
})
export class TreeviewComponent implements OnInit, OnDestroy {
    @Input() subNodes: string[];
    @Input() dataService: any;
    @Input() config: TreeviewConfig = {};
    @Input() parentNode: any = {};
    nodes: any[];
    icon: string;
    nodesSubscription: any;

    constructor() {}

    ngOnInit() {
        this.icon = this.getIcon(null);
        this.nodesSubscription = this.dataService.getData(this.subNodes).subscribe(nodes => {
            // Are we the ROOT_NODE and should we hide it?
            if(!this.config.showRootNode && nodes[0]._id == "ROOT_NODE") {
                this.nodesSubscription.unsubscribe();
                this.nodesSubscription = this.dataService.getData(nodes[0].children).subscribe(nodes => {
                    this.checkAutoExpand(nodes);
                    this.nodes = nodes;
                });
            } else {
                this.checkAutoExpand(nodes);
                this.nodes = nodes;
            }
        });
    }

    ngOnDestroy() {
        this.nodesSubscription.unsubscribe();
    }

    checkAutoExpand(nodes) {
        if(!this.config.collapsed) {
            nodes.forEach(el => {
                el.expanded=true;
            });
        }
    }

    toggle(node) {
        if(node.children && node.children.length > 0) {
            node.expanded = !node.expanded;
        }
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

    addNode(node) {
        console.log("Add node", node, " on Parent", this.parentNode);
        let number = Math.random();
        let newId = "Test" + number;
        this.dataService.addNode(node, {_id: newId, children: []});
    }

    removeNode(node) {
        console.log("Remove node", node, " on Parent", this.parentNode);
        this.dataService.removeNode(this.parentNode, node);
    }

}