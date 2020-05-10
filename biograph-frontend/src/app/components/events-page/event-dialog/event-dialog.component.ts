import {Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../../models/Event';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Category} from '../../../models/Category';
import {CategoryService} from '../../../services/category/category.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.less']
})
export class EventDialogComponent implements OnInit {
  readonly eventNameMaxLength = 256;
  readonly timeBoundedOption = {
    optionId: 2,
    name: 'Bounded',
    description: 'Event has time limits'
  };
  readonly eventTimeBoundOptions = [
    {
      optionId: 1,
      name: 'Not bounded',
      description: 'No time bounds'
    },
    this.timeBoundedOption,
  ];
  categories$: Observable<Category[]>;
  formGroup: FormGroup;
  private event: Event;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: { event: Event },
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ) {
  }

  get eventNameFormControl(): AbstractControl {
    return this.formGroup.get('eventName');
  }

  get eventDateFormControl(): AbstractControl {
    return this.formGroup.get('eventDate');
  }

  get eventCategoryFormControl(): AbstractControl {
    return this.formGroup.get('eventCategory');
  }

  get eventNameValidationErrorMessage(): string {
    if (this.eventNameFormControl.hasError('maxlength')) {
      return 'Name length must no more than ' + this.eventNameMaxLength;
    }
    return 'Name is required';
  }

  get eventDateValidationErrorMessage(): string {
    return 'Date is required';
  }

  get eventCategoryValidationErrorMessage(): string {
    return 'Category is required';
  }

  get parametersFormArray(): FormArray {
    return this.formGroup.get('parameters') as FormArray;
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesOwnedByCurrentUser();
    // cloning event object
    this.event = JSON.parse(JSON.stringify(this.dialogData.event));
    this.formGroup = this.createFormGroup();
    // TODO asem add unsubscribe here
    this.eventCategoryFormControl.valueChanges.subscribe(() => {
      console.log('Event category changed. Clearing formArray...');
      this.parametersFormArray.clear();
    });
  }

  addParameterFormControl(parameterFormControl: FormControl) {
    console.log('Adding parameter form control to formArray: ', parameterFormControl);
    this.parametersFormArray.push(parameterFormControl);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      eventName: new FormControl(this.event.name, [Validators.required, Validators.maxLength(this.eventNameMaxLength)]),
      eventDate: new FormControl('', [Validators.required]),
      eventCategory: new FormControl('', [Validators.required]),
      parameters: this.formBuilder.array([]),
    });
  }
}
