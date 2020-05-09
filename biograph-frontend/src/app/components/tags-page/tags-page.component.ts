import {Component, OnInit, ViewChild} from '@angular/core';
import {getStubEmptyTag, Tag} from '../../models/Tag';
import {TagService} from '../../services/tag/tag.service';
import {combineLatest, delay, map, take} from 'rxjs/operators';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Observable, Subject} from 'rxjs';
import {DialogService} from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.less']
})
export class TagsPageComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Tag>;
  readonly columnsToDisplay = ['name', 'totalEvents', 'creationTime'];
  dataSource: MatTableDataSource<Tag> = new MatTableDataSource<Tag>([]);
  private tags$: Observable<Tag[]>;
  private currentSearchQuery = '';
  private searchQuery$ = new Subject<string>();

  constructor(
    private tagService: TagService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.tags$ = this.tagService.getTagsOwnedByCurrentUser();
    this.tags$.pipe(
      take(1),
    ).subscribe((tags: Tag[]) => {
      this.dataSource = new MatTableDataSource<Tag>(tags);
      this.dataSource.sort = this.sort;
    });
    // TODO asem add unsubscribe here
    this.tags$.pipe(
      // short delay to ensure that table is initialized [dirty hack]
      delay(1000),
      combineLatest(
        this.searchQuery$.pipe(
          // startWith(''),
          map(q => q.toLowerCase()),
        )
      )
    ).subscribe(([tags, searchQuery]) => {
      this.updateTableView(this.filter(tags, searchQuery));
    });
  }

  search(searchQuery: string): void {
    this.currentSearchQuery = searchQuery;
    const searchQueryLowerCase = searchQuery.toLowerCase();
    this.searchQuery$.next(searchQueryLowerCase);
  }

  openNewTagDialog(): void {
    // TODO asem - IMPORTANT needs to add created tag to table
    this.dialogService.openTagDialog(getStubEmptyTag());
  }

  private filter(tags: Tag[], searchQuery: string): Tag[] {
    return tags.filter(
      tag => tag.name.toLowerCase().includes(searchQuery) || tag.description.toLowerCase().includes(searchQuery));
  }

  private updateTableView(tags: Tag[]) {
    this.dataSource = new MatTableDataSource<Tag>(tags);
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }
}
