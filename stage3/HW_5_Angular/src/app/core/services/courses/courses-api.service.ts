import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Course} from "../../models/course.module";
import {Observable} from "rxjs";

const BASE_API = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class CoursesApiService {

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${BASE_API}/courses`)
  }

  deleteCourse(id: number) {
    return this.http.delete(`${BASE_API}/courses/${id}`)
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${BASE_API}/courses/`, course)
  }

  // getCourse(id: number): Observable<Course> {
  //   return this.http.get<Course>(`${BASE_API}/courses/${id}`)
  // }

  editCourse (course: Course): Observable<Course> {
    return this.http.put<Course>(`${BASE_API}/courses/${course.id}`, course)
  }

  getCourseByTitleFilter(titleStr: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${BASE_API}/courses/?title_like=${titleStr}`)
  }

  getSliceCourses(start: number, end: number): Observable<Course[]> {
    let params = new HttpParams()
    params = params.append('_start', `${start}`)
    params = params.append('_end', `${end}`)

    return this.http.get<Course[]>(`${BASE_API}/courses?`, {params})
  }
}
