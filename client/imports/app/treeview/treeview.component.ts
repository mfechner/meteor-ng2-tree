import { Component, OnInit, Input } from "@angular/core";


import template from "./treeview.component.html";
import style from "./treeview.component.scss";

import { Locations } from "../../../../both/models/locations.model";
import { LocationsService } from "./locations.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-treeview",
    template,
    styles: [ style ]
})
export class TreeviewComponent implements OnInit {
    @Input() root: string[];
    nodes: Locations[];
    private subscription;
    locations: Observable<any[]>;


    constructor(private locationsService: LocationsService) {}

    ngOnInit() {
        console.log("TreeviewComponent in ngOnInit, root is:", this.root);

        this.locations=this.locationsService.getData(this.root).zone();
    }

}