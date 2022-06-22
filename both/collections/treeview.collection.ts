import { MongoObservable } from "meteor-rxjs";
import { Treeview } from "../models/treeview.model";


export const TreeviewCollection = new MongoObservable.Collection<Treeview>("treeview");