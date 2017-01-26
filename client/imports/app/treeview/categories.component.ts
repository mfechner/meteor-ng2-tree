import { Component, OnInit, OnDestroy } from "@angular/core";
import template from "./categories.component.html";
import styles from "./categories.component.scss";
import { LocationsService } from "./locations.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-categories",
    template,
    styleUrls: [ styles ]
})
export class CategoriesComponent implements OnInit{
    locations: Observable<any[]>;

    constructor(private locationsService: LocationsService) {

    }

    ngOnInit() {
        console.log("CategoriesComponent in ngOnInit");
        this.locations = this.locationsService.getData().zone();
    }

}