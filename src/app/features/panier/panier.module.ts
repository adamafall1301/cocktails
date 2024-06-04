import { NgModule } from '@angular/core';
import {PanierContainerComponent} from "./panier-container/panier-container.component";
import {IngredientListComponent} from "./panier-container/ingredient-list/ingredient-list.component";
import {RouterModule} from "@angular/router";
import {PANIER_ROUTES} from "./panier.routes";
import {SharedModule} from "../../shared/modules/shared.module";



@NgModule({
  declarations: [
    PanierContainerComponent,
    IngredientListComponent
  ],
  imports: [
    RouterModule.forChild(PANIER_ROUTES),
    SharedModule
  ]
})
export class PanierModule { }
