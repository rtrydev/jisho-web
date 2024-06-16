import {AfterViewInit, Component, ElementRef, ViewChild, effect} from '@angular/core';
import {SearchService, loadedEntries} from '../../services/search.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements AfterViewInit {
  public searchQuery: string = '';
  public isLoadingQueryResult: boolean = false;

  @ViewChild('searchInput')
  private searchInput!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('searchForm')
  private searchForm!: ElementRef<HTMLFormElement>;

  constructor(private searchService: SearchService, private router: Router) {
    effect(() => {
      if (!loadedEntries() || !this.searchQuery) {
        return;
      }

      this.router.navigate(
        ['search'], {
          queryParams: {
            query: this.searchQuery
          }
        }
      );
    });
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
  }
}
