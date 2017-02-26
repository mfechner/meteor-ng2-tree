import { Component, OnInit, OnDestroy } from "@angular/core";
import template from "./app.component.html";
import style from "./app.component.scss";
import { TreeNode } from "angular2-tree-component";
import { CategoriesDataService } from "./categories/categories.service";

@Component({
  selector: "app",
  template,
  styles: [ style ]
})
export class AppComponent implements OnInit, OnDestroy {
  nodes: any[];

  options;
  nodesSubscription;

  constructor(private categoriesDataService: CategoriesDataService) {
    this.options = {
      getChildren: (node: TreeNode) => {
        console.log("Called getChildren with", node);
        return this.categoriesDataService.getData(node.children)
          .subscribe(res => {
            console.log("In data subscribe");
            let children = [];
            for (let r of res) {
              console.log("Child in loop", r);
              children.push(r);
            }
            console.log("All children", children);
            return children;
          });
      },
      idField: "_id",
      displayField: "_id"
    };

  }

  ngOnInit() {
    console.log("app.component ngOnInit");
    this.nodesSubscription = this.categoriesDataService.getData()
      .subscribe(res => {
        console.log("ngOnInit", res);
        this.nodes = res;
        console.log("nodes=", this.nodes);
      });
  }

  ngOnDestroy() {
    this.nodesSubscription.unsubscribe();
  }
}
