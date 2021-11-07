import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Course} from "../core/models/course.module";

@Directive({
  selector: '[appHighlightNewCourse]'
})
export class HighlightNewCourseDirective implements OnInit {
  @Input('appHighlightNewCourse') item: Course | undefined

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  };

  ngOnInit(): void {
    if (this.item?.date) {
      const dateOfCourse = this.item?.date
      const currentDate: Date = new Date()
      const newCourseLimit = 14;

      const milliSecInSec = 1000;
      const secInHour = 3600;
      const hoursInDay = 24;

       let formatDate = new Date(dateOfCourse);

      let differInMilliSec = currentDate.getTime() - formatDate.getTime();
      let daysFromCreation = Math.round(differInMilliSec/milliSecInSec/secInHour/hoursInDay)

      if(daysFromCreation < newCourseLimit) {
        this.renderer.setStyle(this.elRef.nativeElement, 'border', '3px solid #414452')
      }
    }


  }
}
