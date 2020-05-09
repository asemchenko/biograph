import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/Tag';
import {TagService} from '../../services/tag/tag.service';
import {take} from 'rxjs/operators';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.less']
})
export class TagsPageComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Tag>;
  filteredTags$: Observable<Tag[]>;
  dataSource: MatTableDataSource<Tag>;
  readonly columnsToDisplay = ['name', 'totalEvents', 'creationTime'];
  private allTags: Tag[];

  constructor(
    private tagService: TagService,
  ) {
  }

  ngOnInit(): void {
    this.tagService.getTagsOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((tags: Tag[]) => {
      this.allTags = tags;
      this.dataSource = new MatTableDataSource<Tag>(this.allTags);
      this.dataSource.sort = this.sort;
      console.log('Got all tags: ', this.allTags);
    });
    // this.filteredTags$ = this.tagService.getTagsOwnedByCurrentUser();
  }

  search(searchQuery: string): void {

  }

  openNewTagDialog(): void {

  }

  private updateTableView() {
    this.dataSource = new MatTableDataSource<Tag>(this.allTags);
    this.dataSource.sort = this.sort;
    console.log('Before renderRows()');
    this.table.renderRows();
  }
}
