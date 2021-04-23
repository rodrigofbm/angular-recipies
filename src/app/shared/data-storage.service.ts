import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  createRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put('https://recipes-a7ebc-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(console.log);
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>('https://recipes-a7ebc-default-rtdb.firebaseio.com/recipes.json')
      .subscribe(recipes => {
       this.recipeService.fetchRecipes(recipes);
      });
  }

}
