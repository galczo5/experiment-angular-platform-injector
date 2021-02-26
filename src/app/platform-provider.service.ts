import { ChangeDetectorRef, Injectable, Injector, PlatformRef, StaticProvider } from '@angular/core';
import { COMPONENT_TOKEN } from 'src/app/token';

@Injectable({ providedIn: 'root' })
export class PlatformProviderService {

  static getInjector(parent: Injector, ...providers: Array<StaticProvider>): Injector {
    return Injector.create({
      parent,
      providers: [...providers]
    });
  }

  replaceInjector(changeDetectorRef: ChangeDetectorRef, ...providers: Array<StaticProvider>): void {
    const oldInjector = (changeDetectorRef as any)._lView[9];
    const injector = PlatformProviderService.getInjector(oldInjector, providers);

    (changeDetectorRef as any)._lView[9] = injector;
  }
}
