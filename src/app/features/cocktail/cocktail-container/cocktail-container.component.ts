import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cocktail} from '../../../shared/interfaces/cocktail.interface';
import {CocktailService} from "../../../shared/services/cocktail.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cocktail-container',
  templateUrl: './cocktail-container.component.html',
  styleUrls: ['./cocktail-container.component.scss'],
})
export class CocktailContainerComponent implements OnInit, OnDestroy {
  cocktails$: Observable<Cocktail[]> = this.cocktailService.cocktails$;

  constructor(private cocktailService: CocktailService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
