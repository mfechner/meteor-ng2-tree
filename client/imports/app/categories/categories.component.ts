import { Component, OnInit, OnDestroy } from "@angular/core";
import template from "./categories.component.html";
import styles from "./categories.component.scss";
import { CategoriesDataService } from "./categories.service";
import { TreeviewConfig } from "../treeview/treeviewconfig.model";

@Component({
    selector: "app-categories",
    template,
    styleUrls: [ styles ]
})
export class CategoriesComponent implements OnInit{
    treeConfig: TreeviewConfig = {
        showRootNode: false,
        autoExpand: true
    };

    constructor(private categoriesDataService: CategoriesDataService) {}

    ngOnInit() {
        console.log("CategoriesComponent in ngOnInit");
    }

}