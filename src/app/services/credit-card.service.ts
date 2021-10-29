import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor() { }


  //Randomly returns successful or failed responses
  remove$(): Observable<CreditCardResult> {
    const rnd = Math.random() * 100;
    const bool = rnd > 50;
    const result: CreditCardResult = {
      successful: bool,
      errorMessage: bool ? undefined : 'Issue removing debit card, please trya again later.'
    };
    return of(result).pipe(delay(3000));
  }
}


export interface CreditCardResult {
  successful: boolean;
  errorMessage?: string;
}
