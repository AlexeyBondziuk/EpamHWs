import { Injectable } from '@angular/core';
import {CoursesApiService} from "../../../core/services/courses/courses-api.service";
import {LoaderService} from "../../../core/services/loader/loader.service";
import {finalize, switchMap, tap} from "rxjs/operators";
import {Course} from "../../../core/models/course.module";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {DateService} from "../../../core/services/date/date.service";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesSubject$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([])
  courses$: Observable<Course[]> = this.coursesSubject$$.asObservable()

  courseSubject$$: Subject<Course>= new Subject()
  course$: Observable<Course> = this.courseSubject$$.asObservable()

  coursesOnThePage: number = 5;

  constructor(
    private coursesApiService: CoursesApiService,
    private loaderService: LoaderService,
    private router: Router,
    private dateService: DateService,
    private route: ActivatedRoute
  ) {}

  loadCourses(start: number, end: number): Observable<Course[]> {
    this.loaderService.show();

    return this.getCourses(start, end).pipe(
      tap((courses: Course[]) => this.coursesSubject$$.next(courses)),
      finalize(() => this.loaderService.hide())
    )
  }

  deleteCourseById (id: number): Observable<{}> {
    this.loaderService.show();

    return this.deleteCourse(id).pipe(
      switchMap( () => this.getCourses(0, this.coursesOnThePage)), ////////////////////////////решить с числами
      tap((courses: Course[]) => this.coursesSubject$$.next(courses)),
      finalize(() => this.loaderService.hide())
    )
  }

  addCourse(course: Course) {
    this.loaderService.show();

    course.date = this.dateService.changeDateFormatFromFormToBack(course.date)

    return this.coursesApiService.addCourse(course).pipe(
      tap(() => this.router.navigate(['/courses'])),
      finalize(() => this.loaderService.hide())
    )
  }

  editCourse(course: Course) {
    this.loaderService.show();

    course.date = this.dateService.changeDateFormatFromFormToBack(course.date)

    return this.coursesApiService.editCourse(course).pipe(
      tap(() => this.router.navigate(['/courses'])),
      finalize(() => this.loaderService.hide())
    )
  }

  // getCourseById (id: number) {
  //   // this.loaderService.show();
  //
  //   // this.route.data
  //   //   .pipe(
  //   //     tap((course: any) => {
  //   //       this.courseSubject$$.next(course)
  //   //     }),
  //   //     finalize(() => this.loaderService.hide())
  //   //   ).subscribe((data => console.log(data)))
  // }

  getCourseByTitleFilter (titleStr: string): Observable<Course[]> {
    this.loaderService.show();

    return this.getCourseByTitleFilterFromApi(titleStr)
      .pipe(
        tap((courses) => {
          this.coursesSubject$$.next(courses)
        }),
        finalize(() => this.loaderService.hide())
      )
  }

  // private getCourses(): Observable<Course[]> {
  //   return this.coursesApiService.getAllCourses()
  // }

  private getCourses(start: number, end: number): Observable<Course[]> {
    return this.coursesApiService.getSliceCourses(start, end)
  }

  private deleteCourse(id: number): Observable<{}> {
    return this.coursesApiService.deleteCourse(id)
  }

  private getCourseByTitleFilterFromApi (titleStr: string): Observable<Course[]> {
    return this.coursesApiService.getCourseByTitleFilter(titleStr)
  }

  cancelAddingCourse(): void {
    this.router.navigate(['/courses'])
  }
}
