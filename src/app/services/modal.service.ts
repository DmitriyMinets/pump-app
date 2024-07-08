import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);
  data$ = new BehaviorSubject<any>(null);
  title$ = new BehaviorSubject<string>('');
  component$ = new BehaviorSubject<string>('');

  open(data: any = null, title: string = '', component: string) {
    this.data$.next(data);
    this.isVisible$.next(true);
    this.title$.next(title);
    this.component$.next(component);
  }

  close() {
    this.isVisible$.next(false);
  }
}
