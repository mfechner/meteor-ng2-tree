import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { TreeviewComponent } from "./treeview/treeview.component";
import { CategoriesDataService } from "./categories/categories.service";
import { CategoriesComponent } from "./categories/categories.component";

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
      TreeviewComponent,
      CategoriesComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
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
