import {Injectable, Injector, PlatformRef, StaticProvider} from '@angular/core';

export class PlatformProviderService {

  static getInjector(parent: Injector, ...providers: Array<StaticProvider>): Injector {
    return Injector.create({
      parent,
      providers: [...providers]
    });
  }
}
