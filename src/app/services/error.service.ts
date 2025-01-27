import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class ErrorService {
  error$ = new Subject<string>();

  handle(message: string) {
    this.error$.next(message);
  }

  clear() {
    this.error$.next('');
  }
}
