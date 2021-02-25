import {Component, Inject, OnInit, Optional} from '@angular/core';
import {TOKEN} from './token';

@Component({
  selector: 'app-indicator',
  template: `
    <button class="btn btn-lg" [class.btn-success]="!!value" [class.btn-danger]="!value">
      <ng-container *ngIf="!!value">
        <i class="fas fa-check mr-1"></i>
        Value provided
      </ng-container>
      <ng-container *ngIf="!value">
        <i class="fas fa-times mr-1"></i>
        Value not provided
      </ng-container>
    </button>
  `
})
export class IndicatorComponent {

  constructor(@Optional() @Inject(TOKEN) readonly value: string) { }

}
