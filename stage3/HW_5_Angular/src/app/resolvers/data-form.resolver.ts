import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Course} from "../core/models/course.module";

const BASE_API = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class DataFormResolver implements Resolve<boolean> {
  constructor(private httpClient: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    return this.httpClient.get<Course>(`${BASE_API}/courses/${route.params.id}`) ;
  }
}
