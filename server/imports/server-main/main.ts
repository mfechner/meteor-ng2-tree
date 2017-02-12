import { LocationsCollection } from "../../../both/collections/locations.collection";
import { CategoriesCollection } from "../../../both/collections/categories.collection";


export class Main {
  start(): void {
    this.initFakeData();
  }

  initFakeData(): void {

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
