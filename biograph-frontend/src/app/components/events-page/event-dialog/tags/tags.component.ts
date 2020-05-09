import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagService} from '../../../../services/tag/tag.service';
import {Observable} from 'rxjs';
import {Tag} from '../../../../models/Tag';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith, withLatestFrom} from 'rxjs/operators';

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
  tagFormControl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private tagService: TagService,
  ) {
  }

  ngOnInit(): void {
    this.tags$ = this.tagService.getTagsOwnedByCurrentUser();
    this.filteredTags$ = this.tagFormControl.valueChanges.pipe(
      /*tap(value => {
        console.log('[filteredTags$] Got value: ', value);
      }),
      filter(value => !!value),*/
      startWith(null),
      map(value => value ? value : ''),
      map(value => typeof value === 'string' ? value : value.name),
      withLatestFrom(this.tags$),
      map(([tagName, allTags]) => {
        const remainedTags = this.getRemainedTags(allTags);
        console.log('Got remained tags: ', remainedTags);
        return tagName ? this.filter(tagName, remainedTags) : remainedTags;
      }),
    );
  }

  add(event: MatChipInputEvent): void {
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
    console.log('Got selected event: ', event);
    this.selectedTags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagFormControl.setValue(null);
  }

  remove(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);
  }

  private getRemainedTags(allTags: Tag[]) {
    console.log('[getRemainedTags] allTags/selectedTags: ', allTags, this.selectedTags);
    return allTags.filter(tag => !this.selectedTags.map(t => t.tagId).includes(tag.tagId));
  }

  private filter(tagName: string, allTags: Tag[]) {
    const filterValue = tagName.toLowerCase();
    return allTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }
}
