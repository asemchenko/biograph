import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EventDialogComponent} from '../../components/events-page/event-dialog/event-dialog.component';
import {Event} from '../../models/Event';
import {TagDialogComponent} from '../../components/tags-page/tag-dialog/tag-dialog.component';
import {Tag} from '../../models/Tag';
import {QuestionDialogComponent, QuestionDialogConfiguration} from '../../components/modals/question-dialog/question-dialog.component';
import {SafeDeleteDialogComponent, SafeDeleteDialogConfig} from '../../components/modals/safe-delete-dialog/safe-delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly configuration = {
    width: 'min(700px, 95vw)',
  };

  constructor(
    private dialog: MatDialog,
  ) {
  }

  public openEventDialog(event: Event): MatDialogRef<EventDialogComponent> {
    return this.dialog.open(EventDialogComponent, {...this.configuration, data: {event}});
  }

  public openTagDialog(tag: Tag): MatDialogRef<TagDialogComponent> {
    return this.dialog.open(TagDialogComponent, {...this.configuration, data: {tag}});
  }

  public openQuestionDialog(config: QuestionDialogConfiguration): MatDialogRef<QuestionDialogComponent> {
    return this.dialog.open(QuestionDialogComponent, {width: 'min(500px, 95vw)', data: config});
  }

  public openSafeDeleteDialog(config: SafeDeleteDialogConfig): MatDialogRef<SafeDeleteDialogComponent> {
    return this.dialog.open(SafeDeleteDialogComponent, {width: 'min(500px, 95vw)', data: config});
  }
}

