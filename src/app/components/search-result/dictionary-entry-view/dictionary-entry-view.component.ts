import { Component, Input } from '@angular/core';
import {DictionaryEntry} from '../../../models/dictionary-entry.model';
import { AppendHintsPipe } from "../../../pipes/append-hints.pipe";

@Component({
    selector: 'app-dictionary-entry-view',
    standalone: true,
    templateUrl: './dictionary-entry-view.component.html',
    styleUrl: './dictionary-entry-view.component.scss',
    imports: [AppendHintsPipe]
})
export class DictionaryEntryViewComponent {
  @Input()
  public entry!: DictionaryEntry;
}
