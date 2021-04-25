import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RescipeStartComponent } from './rescipe-start/rescipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RescipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RecipesRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule {}
