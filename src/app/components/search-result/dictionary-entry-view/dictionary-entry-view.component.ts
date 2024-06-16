import { Component, Input } from '@angular/core';
import {DictionaryEntry} from '../../../models/dictionary-entry.model';

@Component({
  selector: 'app-dictionary-entry-view',
  standalone: true,
  imports: [],
  templateUrl: './dictionary-entry-view.component.html',
  styleUrl: './dictionary-entry-view.component.scss'
})
export class DictionaryEntryViewComponent {
  @Input()
  public entry!: DictionaryEntry;
}
