import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import { COMPONENT_TOKEN } from 'src/app/token';
import { PlatformProviderService } from 'src/app/platform-provider.service';

const key = 'provided';

@Component({
  selector: 'app-root',
  template: `
    <strong>Platform level</strong>
    <div class="d-flex align-items-center mb-5 mt-2">
      <button class="btn btn-lg btn-primary" (click)="provide()">Toggle</button>
      <app-indicator class="ml-3"></app-indicator>
    </div>
    <i class="text-muted mt-3 d-block" *ngIf="needRefresh">Refresh to reload platform, refresh in {{ refreshIn }}s</i>

    <strong>Component level</strong>
    <div class="d-flex align-items-center mt-2">
      <button class="btn btn-lg btn-primary"
              [disabled]="injectorReplaced"
              [class.btn-success]="injectorReplaced"
              (click)="replaceInjector()">
        <ng-container *ngIf="!injectorReplaced">Set injector</ng-container>
        <ng-container *ngIf="injectorReplaced">
          <i class="fas fa-check mr-1"></i>
          Injector replaced
        </ng-container>
      </button>
      <button class="btn btn-lg btn-primary ml-3" (click)="render = true">Render</button>
      <app-indicator-2 *ngIf="render" class="ml-3"></app-indicator-2>
    </div>`
})
export class AppComponent implements OnInit {

  provided: boolean;
  needRefresh = false;
  refreshIn = 3;

  render = false;
  injectorReplaced: boolean = false;

  constructor(private readonly injector: Injector,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly platformProviderService: PlatformProviderService) {
  }

  ngOnInit(): void {
    this.provided = !!localStorage.getItem(key);
  }

  provide(): void {
    if (this.needRefresh) {
      return;
    }

    this.needRefresh = true;
    const item = localStorage.getItem(key);

    if (item) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, 'true');
    }

    this.waitAndRefresh();
  }

  replaceInjector(): void {
    if (this.injectorReplaced) {
      return;
    }

    this.injectorReplaced = true;

    this.platformProviderService.replaceInjector(this.changeDetectorRef, {
      provide: COMPONENT_TOKEN,
      useValue: 'Injected with dynamic component'
    });
  }

  private waitAndRefresh(): void {
    interval(1000)
      .pipe(take(3))
      .subscribe(() => {
        this.refreshIn = this.refreshIn - 1;
        if (this.refreshIn === 0) {
          window.location.reload();
        }
      });
  }

}
