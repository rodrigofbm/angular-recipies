import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
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
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  selectedIngredient$: Subscription;
  isEditMode = false;
  editItemIdenx: number;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.selectedIngredient$ = this.slService.selectedIngredient
      .subscribe((index: number) => {
        this.editItemIdenx = index;
        this.isEditMode = true;
        this.editItem = this.slService.getIngredient(index);

        this.form.setValue({
          'name': this.editItem.name,
          'amount': this.editItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (!this.isEditMode) {
      this.slService.addIngredient(newIngredient);
    } else {
      this.slService.updateIngredient(this.editItemIdenx, newIngredient);
    }
    this.resetForm();
  }

  onClear() {
    this.resetForm();
  }

  onDelete(ingredientName: NgModel) {
    this.slService.deleteIngredient(ingredientName.value);
  }

  private resetForm() {
    this.form.reset();
    this.isEditMode = false;
  }

  ngOnDestroy(): void {
    this.selectedIngredient$.unsubscribe();
  }
}
