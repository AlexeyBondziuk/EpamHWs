import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading$$ = new BehaviorSubject<boolean>(false)
  public loading$ = this.loading$$.asObservable()

  constructor() { }

  show(): void {
   this.loading$$.next(true)
  }

  hide(): void {
    this.loading$$.next(false)
  }
}
