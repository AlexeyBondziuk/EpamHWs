import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Course} from "../../../../core/models/course.module";
import {CoursesService} from "../../services/courses.service";
import {ActivatedRoute} from "@angular/router";
import { take, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  id: number | null = null;
  course$: Observable<Course> = this.coursesService.course$

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges()
    this.id = this.activatedRoute.snapshot.params.id

    if (this.id) {
      this.activatedRoute.data
        .pipe(
          tap(data =>
            this.coursesService.courseSubject$$.next(data[0])
          ))
        .subscribe()

      this.course$.pipe(
        tap((course:any) => (this.course$ = course))
      )
    }
  }

  editHandler(course: Course) {
    this.coursesService.editCourse(course).pipe(take(1)).subscribe()
  }

  addHandler(course: Course): void {
    this.coursesService.addCourse(course).pipe(take(1)).subscribe()
  }

  cancelHandler() {
    this.coursesService.cancelAddingCourse()
  }
}
