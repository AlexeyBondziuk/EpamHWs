import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './containers/courses/courses.component';
import {CoursesRoutingModule} from "./courses-routing.module";
import {RouterModule} from "@angular/router";
import { CourseComponent } from './containers/course/course.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    RouterModule,
    SharedModule,
    CoreModule
  ]
})
export class CoursesModule { }
