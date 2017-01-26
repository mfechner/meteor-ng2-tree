import {DemoCollection} from "../../../both/collections/demo.collection";
import {Demo} from "../../../both/models/demo.model";
import { LocationsCollection } from "../../../both/collections/locations.collection";


export class Main {
  start(): void {
    this.initFakeData();
  }

  initFakeData(): void {
    if (DemoCollection.find({}).cursor.count() === 0) {
      const data: Demo[] = [{
        name: "Dotan",
        age: 25
      }, {
        name: "Liran",
        age: 26
      }, {
        name: "Uri",
        age: 30
      }];
      data.forEach((obj: Demo) => {
        DemoCollection.insert(obj);
      });
    }
    if (LocationsCollection.find({}).cursor.count() === 0) {
      console.log("Create standard Locations collection");

      LocationsCollection.insert({
        _id: "ROOT_NODE",
        children:[]
      }).subscribe( id => {
        LocationsCollection.insert({
          _id: "Passiv",
          children: []
        }).subscribe( id => {
          LocationsCollection.insert({
            _id: "Widerstand",
            children: []
          });
          LocationsCollection.update({_id: id}, {$addToSet: {children: "Widerstand"}});
          LocationsCollection.insert({
            _id: "Diode",
            children: []
          });
          LocationsCollection.update({_id: id}, {$addToSet: {children: "Diode"}});
        });
        LocationsCollection.update({_id: id}, {$addToSet: {children: "Passiv"}});

        LocationsCollection.insert({
          _id: "Aktiv",
          children: []
        }).subscribe( (id) => {
          LocationsCollection.insert({
            _id: "Mikrokontroller",
            children: []
          });
          LocationsCollection.update({_id: id}, {$addToSet: {children: "Mikrokontroller"}});
          LocationsCollection.insert({
            _id: "ICs",
            children: []
          });
          LocationsCollection.update({_id: id}, {$addToSet: {children: "ICs"}});
        });
        LocationsCollection.update({_id: id}, {$addToSet: {children: "Aktiv"}});

      });
    }
  }
}
