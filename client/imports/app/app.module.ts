import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { DemoDataService } from "./demo/demo-data.service";

import { TreeviewComponent } from "./treeview/treeview.component";
import { TreeviewDataService } from "./treeview/treeview.service";
import { LocationsService } from "./treeview/locations.service";
import { CategoriesComponent } from "./treeview/categories.component";

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    DemoComponent,
      TreeviewComponent,
      CategoriesComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    DemoDataService,
      TreeviewDataService,
      LocationsService
  ],
  // Modules
  imports: [
    BrowserModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
