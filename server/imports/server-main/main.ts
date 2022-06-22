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
        hasChildren: true,
        childrenIds:[]
      }).subscribe( id => {
        CategoriesCollection.insert({
          _id: "Passiv",
          hasChildren: true,
          childrenIds: []
        }).subscribe( id => {
          CategoriesCollection.insert({
            _id: "Widerstand",
            hasChildren: false,
            childrenIds: []
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "Widerstand"}});
          CategoriesCollection.insert({
            _id: "Diode",
            hasChildren: false,
            childrenIds: []
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "Diode"}});
        });
        CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "Passiv"}});

        CategoriesCollection.insert({
          _id: "Aktiv",
          hasChildren: true,
          childrenIds: []
        }).subscribe( (id) => {
          CategoriesCollection.insert({
            _id: "Mikrokontroller",
            hasChildren: true,
            childrenIds: []
          }).subscribe( id => {
            CategoriesCollection.insert({
              _id: "Atmel",
              hasChildren: false,
              childrenIds: []
            });
            CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "Atmel"}});
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "Mikrokontroller"}});
          CategoriesCollection.insert({
            _id: "ICs",
            hasChildren: false,
            childrenIds: []
          });
          CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "ICs"}});
        });
        CategoriesCollection.update({_id: id}, {$addToSet: {childrenIds: "Aktiv"}});

      });
    }
  }
}
