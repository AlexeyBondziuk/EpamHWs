import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CoursesService} from "../../services/courses.service";
import {Course} from "../../../../core/models/course.module";
import {debounceTime, distinctUntilChanged, mergeAll, switchMap, tap} from "rxjs/operators";
import { Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {LoaderService} from "../../../../core/services/loader/loader.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CoursesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]> = this.coursesService.courses$;
  loading$ = this.loaderService.loading$

  searchControl = new FormControl('')

  filteredCoursesEmpty: boolean = false;
  coursesOnThePage = this.coursesService.coursesOnThePage

  constructor(
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursesService.loadCourses(0, this.coursesOnThePage)
      .subscribe();

    this.courses$
      .pipe(
        tap((courses:any) => (
          this.courses$ = courses
        ))
      )

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        return this.coursesService.getCourseByTitleFilter(value);
      }),
      tap((data) => {
        this.filteredCoursesEmpty = this.isFilteredCoursesEmpty(data)
      })
    )
      .subscribe()
  }

  isFilteredCoursesEmpty (data: any): boolean {//вернуть тип!
    return data.length === 0
  }

  handleDelete(id: number): void {
    this.coursesService.deleteCourseById(id).subscribe()
  }

  handleEdit(id: number) {
    this.router.navigate(['/courses', id])
  }

  onLoadMore() {
    this.coursesOnThePage = ++this.coursesService.coursesOnThePage
    console.log(this.coursesOnThePage)
    this.coursesService.loadCourses(0, this.coursesOnThePage)
      .subscribe();
  }
}
