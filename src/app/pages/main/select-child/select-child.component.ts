import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-child',
  templateUrl: './select-child.component.html',
  styleUrl: './select-child.component.scss'
})
export class SelectChildComponent implements OnInit {
  @Input() selectedValue!: string;
  @Output() valueChanged = new EventEmitter<string>();

  options = [
    { value: 'name', viewValue: 'Név szerint' },
    { value: 'price', viewValue: 'Ár szerint' }
  ];

  selected!: string;

  ngOnInit() {
    this.selected = this.selectedValue;
  }

  onSelectionChange(value: string) {
    this.valueChanged.emit(value);
  }
}
