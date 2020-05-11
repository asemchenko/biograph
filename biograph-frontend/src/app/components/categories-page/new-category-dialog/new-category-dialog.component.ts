import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {Attribute} from '../../../models/Attribute';
import {Category} from '../../../models/Category';
import {AttributeService} from '../../../services/attribute/attribute.service';


@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.less']
})
export class NewCategoryDialogComponent implements OnInit {
  readonly categoryNameMaxLength = 50;
  readonly attributeTableDisplayedColumns = ['name', 'remove'];
  readonly category: Category = {
    name: '',
    description: '',
    color: '',
    attributes: [],
    categoryId: null,
    creationTime: null,
    totalEvents: 0
  };
  /**
   * All possible attributes
   */
  allAttributes = [];
  /**
   * Attributes that user already add to category
   */
  searchFilteredAttributes: Observable<any[]>;
  attributes = new MatTableDataSource(this.category.attributes);
  searchAttributeFormControl = new FormControl();
  categoryNameFormControl = new FormControl('', [Validators.required, Validators.maxLength(this.categoryNameMaxLength)]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) attributesTable: MatTable<any>;

  constructor(
    private attributeService: AttributeService,
  ) {
  }

  private static removeAttributeFromCollection(attribute: Attribute, collection: Attribute[]): void {
    const index = collection.indexOf(attribute, 0);
    if (index > -1) {
      collection.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.attributes.sort = this.sort;
    this.attributeService.getAttributesOwnedByCurrentUser().pipe(
      take(1)
    ).subscribe((attributes: Attribute[]) => {
      console.log('[new-category-dialog] Got all user attributes: ', attributes);
      this.allAttributes = attributes;
      this.updateAttributesTable();

      this.configureSearch();
    });
  }

  findMatchingAttributes(searchQuery: string): any[] {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return this.allAttributes.filter(attribute => attribute.name.toLowerCase().includes(lowerCaseSearchQuery));

  }

  searchAttributeDisplayFn(attribute): string {
    return (attribute && attribute.name) ? attribute.name : '';
  }

  addAttribute() {
    // TODO implement adding existing attribute
    const attribute = this.searchAttributeFormControl.value;
    NewCategoryDialogComponent.removeAttributeFromCollection(attribute, this.allAttributes);
    this.category.attributes.push(attribute);
    this.updateAttributesTable();
  }

  updateAttributesTable() {
    this.attributes = new MatTableDataSource(this.category.attributes);
    this.attributes.sort = this.sort;
    this.attributesTable.renderRows();
  }

  removeAttribute(attribute: Attribute) {
    NewCategoryDialogComponent.removeAttributeFromCollection(attribute, this.category.attributes);
    this.allAttributes.push(attribute);
    this.searchAttributeFormControl.setValue(this.searchAttributeFormControl.value);
    this.updateAttributesTable();
    console.log(this.allAttributes);
  }

  getCategoryNameValidationErrorMessage() {
    if (this.categoryNameFormControl.hasError('required')) {
      return 'Category name is required';
    }
    return 'Category name is limited by ' + this.categoryNameMaxLength;
  }

  private configureSearch() {
    this.searchFilteredAttributes = this.searchAttributeFormControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.name),
      startWith(''),
      map(value => {
        return this.findMatchingAttributes(value);
      })
    );
  }
}
