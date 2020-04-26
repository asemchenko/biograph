import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {
  @Output()
  valueChanged = new EventEmitter();
  value: string;

  ngOnInit(): void {

  }

  valueUpdated() {
    this.valueChanged.emit(this.value);
  }
}
