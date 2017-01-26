import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { Locations } from "../../../../both/models/locations.model";
import { LocationsCollection } from "../../../../both/collections/locations.collection";


@Injectable()
export class LocationsService {
    data: ObservableCursor<Locations>;

    constructor() {}

    public getData(id: string[] = ["ROOT_NODE"]): ObservableCursor<Locations> {
        console.log("Get ROOT_NODE with _id $in: ", id);
        this.data = LocationsCollection.find({_id: { $in: id}});
        return this.data;
    }
}