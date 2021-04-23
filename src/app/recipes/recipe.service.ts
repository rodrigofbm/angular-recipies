import { DataStorageService } from './../shared/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  @Input() index: number;
  onRecipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private router: Router) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.filter(recipe => recipe.id === id)[0];
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
    this.onRecipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    const index = this.recipes.indexOf(this.recipes.filter(r => r.id === id)[0]);
    this.recipes[index] = recipe;
    this.onRecipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  fetchRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.onRecipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.onRecipesChanged.next(this.recipes.slice());
    this.router.navigate(['/recipes']);
  }
}
