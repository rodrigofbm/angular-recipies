import { Ingredient } from './../../shared/ingredient.model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Output() shoppingEmitter = new EventEmitter<Ingredient>();
  name: string = '';
  amount: number = 1;

  submit() {
    this.shoppingEmitter.emit(new Ingredient(this.name, this.amount));
  }
}
