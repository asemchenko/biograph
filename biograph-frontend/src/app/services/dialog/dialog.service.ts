import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EventDialogComponent} from '../../components/events-page/event-dialog/event-dialog.component';
import {Event} from '../../models/Event';

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
}
