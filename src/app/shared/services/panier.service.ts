import {Injectable} from '@angular/core';
import {Ingredient} from "../interfaces/ingredient.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  public ingredients$: BehaviorSubject<Ingredient[] | null> = new BehaviorSubject<Ingredient[] | null>(null);

  constructor() {
  }

  public addPanier(ingredients: Ingredient[]): void {
    const currentValue = this.ingredients$.value;
    if (currentValue) {
      const obj = [...currentValue, ...ingredients].reduce((acc:{[cle:string]: number}, curr:Ingredient) => {
        if (acc[curr.name]) {
          acc[curr.name] += curr.quantity;
        } else {
          acc[curr.name] = curr.quantity;
        }
        return acc;
      }, {});
      const result = Object.keys(obj).map((key) => ({
        name: key,
        quantity: obj[key]
      }))
      this.ingredients$.next(result);
    } else {
      this.ingredients$.next(ingredients);
    }
  }
}
