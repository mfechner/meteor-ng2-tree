import { MongoObservable } from "meteor-rxjs";
import { Locations } from "../models/locations.model";


export const LocationsCollection = new MongoObservable.Collection<Locations>("locations");