import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SearchService, loadedEntries} from '../../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DictionaryEntryViewComponent} from './dictionary-entry-view/dictionary-entry-view.component';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-search-result',
    standalone: true,
    templateUrl: './search-result.component.html',
    styleUrl: './search-result.component.scss',
    imports: [DictionaryEntryViewComponent, FormsModule]
})
export class SearchResultComponent implements AfterViewInit {
  public searchQuery: string = '';
  public isLoadingQueryResult: boolean = false;
  public loadedEntries = loadedEntries;

  @ViewChild('searchInput')
  private searchInput!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('searchForm')
  private searchForm!: ElementRef<HTMLFormElement>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {
    const hasPreviousNavigation = !!this.router.getCurrentNavigation()?.previousNavigation;
    this.searchQuery = this.activatedRoute.snapshot.queryParams['query'] || '';

    if (!hasPreviousNavigation && this.searchQuery) {
      this.isLoadingQueryResult = true;
      this.searchService.loadEntries(this.searchQuery).finally(() => {
        this.isLoadingQueryResult = false;
      });
    }
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        this.searchForm.nativeElement.dispatchEvent(
          new Event("submit", {bubbles: true, cancelable: true})
        )
      }
    });
  }

  public async performSearch(): Promise<void> {
    if (this.searchQuery === '' || this.isLoadingQueryResult) {
      return;
    }

    this.isLoadingQueryResult = true;
    await this.searchService.loadEntries(this.searchQuery);
    this.isLoadingQueryResult = false;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          query: this.searchQuery
        },
        queryParamsHandling: 'merge'
      }
    );
  }
}
