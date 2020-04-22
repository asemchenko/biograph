import {Component, OnInit} from '@angular/core';
import {TestService} from '../../services/test/test.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  greeting: Observable<string>;

  constructor(private testService: TestService) {
  }

  ngOnInit(): void {
    this.greeting = this.testService.getHomeGreeting();
  }

}
