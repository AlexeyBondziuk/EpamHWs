import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './component/list-item/list-item.component';
import {MinsToHoursConverterPipe} from "../pipes/mins-to-hours-converter.pipe";
import { HighlightNewCourseDirective } from '../directives/highlight-new-course.directive';

@NgModule({
  declarations: [
    ListItemComponent,
    MinsToHoursConverterPipe,
    HighlightNewCourseDirective
  ],
  exports: [ListItemComponent,
    MinsToHoursConverterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
