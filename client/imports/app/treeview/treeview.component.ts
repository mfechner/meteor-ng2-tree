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

    constructor(private categoriesDataService: CategoriesDataService) {}

    ngOnInit() {
        console.log("TreeviewComponent in ngOnInit, root is:", this.subNodes);
        this.nodes=this.categoriesDataService.getData(this.subNodes).zone();
    }

}