import { Component, OnInit, OnDestroy } from "@angular/core";
import template from "./categories.component.html";
import styles from "./categories.component.scss";
import { CategoriesDataService } from "./categories.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-categories",
    template,
    styleUrls: [ styles ]
})
export class CategoriesComponent implements OnInit{
    categories: Observable<any[]>;

    constructor(private categoriesDataService: CategoriesDataService) {}

    ngOnInit() {
        console.log("CategoriesComponent in ngOnInit");
        this.categories = this.categoriesDataService.getData().zone();
    }

}