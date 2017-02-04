import {DemoCollection} from "../../../both/collections/demo.collection";
import {Demo} from "../../../both/models/demo.model";
import { LocationsCollection } from "../../../both/collections/locations.collection";
import { CategoriesCollection } from "../../../both/collections/categories.collection";


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
    if (CategoriesCollection.find({}).cursor.count() === 0) {
      console.log("Create standard categories collection");

      CategoriesCollection.insert({
        _id: "ROOT_NODE",
        children:[]
      }).subscribe( id => {
        CategoriesCollection.insert({
          _id: "Passiv",
          children: []
        }).subscribe( id => {
          CategoriesCollection.insert({
            _id: "Widerstand",
            children: []
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {children: "Widerstand"}});
          CategoriesCollection.insert({
            _id: "Diode",
            children: []
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {children: "Diode"}});
        });
        CategoriesCollection.update({_id: id}, {$addToSet: {children: "Passiv"}});

        CategoriesCollection.insert({
          _id: "Aktiv",
          children: []
        }).subscribe( (id) => {
          CategoriesCollection.insert({
            _id: "Mikrokontroller",
            children: []
          }).subscribe( id => {
            CategoriesCollection.insert({
              _id: "Atmel",
              children: []
            });
            CategoriesCollection.update({_id: id}, {$addToSet: {children: "Atmel"}});
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {children: "Mikrokontroller"}});
          CategoriesCollection.insert({
            _id: "ICs",
            children: []
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {children: "ICs"}});
        });
        CategoriesCollection.update({_id: id}, {$addToSet: {children: "Aktiv"}});

      });
    }
  }
}
