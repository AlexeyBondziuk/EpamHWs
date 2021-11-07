import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../../core/models/course.module";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  @Input() item!: Course;

  @Output() deleted = new EventEmitter<any>()
  @Output() edit = new EventEmitter<any>()

  constructor() {
  }

  ngOnInit(): void {
  }

  handleDelete() {
    this.deleted.emit(this.item?.id)
  }

  onEdit() {
    this.edit.emit(this.item?.id)
  }
}
