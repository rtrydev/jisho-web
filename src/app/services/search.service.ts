import {HttpClient} from '@angular/common/http';
import {Injectable, WritableSignal, signal} from '@angular/core';
import {DictionaryEntry} from '../models/dictionary-entry.model';
import {lastValueFrom} from 'rxjs';

export const loadedEntries: WritableSignal<DictionaryEntry[] | null> = signal(null);

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = 'https://api.jisho.rtrydev.com';

  constructor(private httpClient: HttpClient) { }

  public async loadEntries(query: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpClient.get<{entries: DictionaryEntry[]}>(
          `${this.apiUrl}/search/?query=${query}`
        )
      );

      loadedEntries.set(response.entries);
    } catch (err) {
      loadedEntries.set(null);
    }
  }
}
