import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SafeDeleteDialogComponent} from './safe-delete-dialog.component';

describe('SafeDeleteDialogComponent', () => {
  let component: SafeDeleteDialogComponent;
  let fixture: ComponentFixture<SafeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafeDeleteDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
