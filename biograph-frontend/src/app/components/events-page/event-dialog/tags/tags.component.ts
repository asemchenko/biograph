import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagService} from '../../../../services/tag/tag.service';
import {Observable, of} from 'rxjs';
import {Tag} from '../../../../models/Tag';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith, tap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.less']
})
export class TagsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags$: Observable<Tag[]>;
  filteredTags$: Observable<Tag[]>;
  selectedTags: Tag[] = [];
  selectedTags$: Observable<Tag[]>;
  tagFormControl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private tagService: TagService,
  ) {
  }

  ngOnInit(): void {
    this.tags$ = this.tagService.getTagsOwnedByCurrentUser();
    this.selectedTags$ = of(this.selectedTags);
    this.filteredTags$ = this.tagFormControl.valueChanges.pipe(
      tap(value => {
        console.log('[filteredTags$] 1 Got value: ', value);
      }),
      startWith(null),
      map(value => value ? value : ''),
      map(value => typeof value === 'string' ? value : value.name),
      withLatestFrom(this.tags$, this.selectedTags$),
      map(([tagName, allTags, selectedTags]) => {
        const remainedTags = this.getRemainedTags(allTags, selectedTags);
        return tagName ? this.filter(tagName, remainedTags) : remainedTags;
      }),
    );
  }

  add(event: MatChipInputEvent): void {
    // TODO asem implement creating new tags just by tapping it's name
    console.log('Got add event: ', event);
    /*const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);*/
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagFormControl.setValue(null);
  }

  remove(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);
    // [dirty hack] just for showing autocomplete
    const curValue = this.tagInput.nativeElement.value;
    this.tagInput.nativeElement.value = '';
    this.tagFormControl.setValue(null);
    this.tagInput.nativeElement.value = curValue;
    this.tagFormControl.setValue(curValue);
  }

  private getRemainedTags(allTags: Tag[], selectedTags: Tag[]) {
    return allTags.filter(tag => !selectedTags.map(t => t.tagId).includes(tag.tagId));
  }

  private filter(tagName: string, allTags: Tag[]) {
    const filterValue = tagName.toLowerCase();
    return allTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }
}
