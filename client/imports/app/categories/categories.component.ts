import { Component, OnInit, OnDestroy } from "@angular/core";
import template from "./categories.component.html";
import styles from "./categories.component.scss";
import { CategoriesDataService } from "./categories.service";

@Component({
    selector: "app-categories",
    template,
    styleUrls: [ styles ]
})
export class CategoriesComponent implements OnInit{
    treeConfig = {
        showRootNode: true
    };

    constructor(private categoriesDataService: CategoriesDataService) {}

    ngOnInit() {
        console.log("CategoriesComponent in ngOnInit");
    }

}