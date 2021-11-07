import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../shared/custom.validators";
import {Course} from "../../../../core/models/course.module";
import {LoaderService} from "../../../../core/services/loader/loader.service";
import {DateService} from "../../../../core/services/date/date.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent implements OnInit {

  @Input() set course(course: Course | null) {
    if (course && course.id) {
      this.id = course.id
      this.isEdit = true
      course.date = this.dateService.changeDateFormatFromBackToForm(course.date)
      this.courseForm.patchValue(course)
    }
  }

  @Output() add = new EventEmitter<Course>()
  @Output() edit = new EventEmitter<Course>()
  @Output() cancel = new EventEmitter<Course>()


  id: number | null = null;
  isEdit: boolean = false;

  loading$ = this.loaderService.loading$

  courseForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(50)]],
    duration: ['100', [Validators.required, CustomValidators.range(1, 600)]],
    date: ['02/31/20', [Validators.required, CustomValidators.date]],
    authors: ['author1', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
  }

  get isDurationRangeTouched():boolean {
    const duration = this.courseForm.get('duration')
    return  !!duration && duration?.touched
  }

  onAdd() {
    if (this.courseForm.valid) {
      this.add.emit(this.courseForm.value)
    }
  }

  onEdit() {
    if (this.courseForm.valid) {
      this.edit.emit({...this.courseForm.value, id: this.id})
    }
  }

  onCancel() {
    this.cancel.emit()
  }
}
