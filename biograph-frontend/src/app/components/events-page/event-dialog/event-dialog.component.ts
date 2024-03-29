import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../../models/Event';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Category} from '../../../models/Category';
import {CategoryService} from '../../../services/category/category.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParameterInfo} from './parameter/parameter.component';
import {Parameter} from '../../../models/Parameter';
import {Tag} from '../../../models/Tag';

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
  private eventParametersInfo: ParameterInfo[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: { event: Event },
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  get eventNameFormControl(): AbstractControl {
    return this.formGroup.get('eventName');
  }

  get eventDescriptionFormControl(): AbstractControl {
    return this.formGroup.get('eventDescription');
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
    // ========== SUBSCRIBE TO FORM CONTROL VALUES CHANGES & SET 'event' property every time form control changes
    // TODO asem add unsubscribe here
    this.eventCategoryFormControl.valueChanges.subscribe((category: Category) => {
      this.event.category = category;
      this.parametersFormArray.clear();
      this.eventParametersInfo = [];
      this.changeDetector.detectChanges();
    });
    this.eventNameFormControl.valueChanges.subscribe((name: string) => {
      this.event.name = name;
    });
    this.eventDescriptionFormControl.valueChanges.subscribe((description: string) => {
      this.event.description = description;
    });
    this.eventDateFormControl.valueChanges.subscribe(([startDate, endDate]) => {
      this.event.startDatetime = new Date(startDate).toISOString();
      this.event.endDatetime = endDate ? new Date(endDate).toISOString() : null;
    });
  }

  addParameter(parameterInfo: ParameterInfo) {
    this.parametersFormArray.push(parameterInfo.formControl);
    this.eventParametersInfo.push(parameterInfo);
    this.changeDetector.detectChanges();
  }

  collectEvent(): Event {
    this.event.parameters = this.eventParametersInfo.map((eventParameterInfo: ParameterInfo): Parameter => {
      return {
        parameterId: null,
        attribute: eventParameterInfo.attribute,
        value: eventParameterInfo.formControl.value,
      };
    });
    return this.event;
  }

  onTagListChanged(currentTagList: Tag[]): void {
    this.event.tags = currentTagList;
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      eventName: new FormControl(this.event.name, [Validators.required, Validators.maxLength(this.eventNameMaxLength)]),
      eventDescription: new FormControl('', []),
      eventDate: new FormControl('', [Validators.required]),
      eventCategory: new FormControl('', [Validators.required]),
      parameters: this.formBuilder.array([]),
    });
  }
}
