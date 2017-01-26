import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { DemoDataService } from "./demo/demo-data.service";

import { TreeviewComponent } from "./treeview/treeview.component";
import { CategoriesDataService } from "./categories/categories.service";
import { CategoriesComponent } from "./categories/categories.component";

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
    CategoriesDataService
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
