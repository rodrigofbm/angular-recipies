import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEditMode = false;

  constructor(private route: ActivatedRoute, private recipesService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.isEditMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
         ingredients.push(new FormGroup({
           'name': new FormControl(ingredient.name, Validators.required),
           'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required]),
         }));
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': ingredients
    });
  }

  get ingredientsControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required]),
    }));
  }

  onSubmit() {
    const name = this.form.value['name'];
    const description = this.form.value['description'];
    const imagePath = this.form.value['imagePath'];
    const ingredients = this.form.value['ingredients'];
    const newRecipe = new Recipe(name, description, imagePath, ingredients);

    if (!this.isEditMode) {
      this.recipesService.addRecipe(newRecipe);
    } else {
      newRecipe.id = this.id;
      this.recipesService.updateRecipe(this.id, newRecipe);
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
