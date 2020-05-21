import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f', { static: true }) slForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe((index: number) => {
        this.edittedItemIndex = index;
         this.editMode = true;
         this.editedItem = this.slService.getIngredient(index);
         this.slForm.setValue({
           name: this.editedItem.name,
           amount: this.editedItem.amount
         });
      })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.slService.onIngredientAdded(newIngredient);
    } else {
      this.slService.updateIngredient(this.edittedItemIndex, newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.edittedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
