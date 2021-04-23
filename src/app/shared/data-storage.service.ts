import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  createRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put<Recipe[]>('https://recipes-a7ebc-default-rtdb.firebaseio.com/recipes.json', recipes)
      .pipe(map((recipes: Recipe[]) => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: !!recipe.ingredients ? recipe.ingredients : []};
        });
      }))
      .subscribe(console.log);
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://recipes-a7ebc-default-rtdb.firebaseio.com/recipes.json')
      .pipe(tap(recipes => {
        this.recipeService.fetchRecipes(recipes);
      }));
  }

}
