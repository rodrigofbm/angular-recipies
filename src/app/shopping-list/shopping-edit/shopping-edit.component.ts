import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.slService.addIngredient(newIngredient);
  }

  onClear() {
    this.slService.clearIngredients();
  }

  onDelete(ingredientName: NgModel) {
    this.slService.deleteIngredient(ingredientName.value);
  }
}
