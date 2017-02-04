import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

import template from "./treeview.component.html";
import style from "./treeview.component.scss";

import { CategoriesDataService } from "../categories/categories.service";
@Component({
    selector: "app-treeview",
    template,
    styles: [ style ]
})
export class TreeviewComponent implements OnInit {
    @Input() subNodes: string[];
    nodes: Observable<any[]>;
    icon: string;

    constructor(private categoriesDataService: CategoriesDataService) {}

    ngOnInit() {
        console.log("TreeviewComponent in ngOnInit, root is:", this.subNodes);
        this.icon = this.getIcon(null);
        this.nodes=this.categoriesDataService.getData(this.subNodes).zone();
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