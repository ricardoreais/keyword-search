import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { IEntry } from '../common/models/IEntry';
import { EntryService } from './services/entry.service';
import { HighlightSearchPipe } from '../common/pipes/highlight-search-pipe';

@Component({
  standalone: true,
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  imports: [AsyncPipe, NgxPaginationModule, HighlightSearchPipe]
})
export class Test1Component implements OnInit {
  private entryService = inject(EntryService);

  filter!: string;
  filteredData$: Observable<IEntry[]> | undefined;
  entriesCount = 50000;
  page = 1;
  pageSize = 20;

  ngOnInit() {
    this.entryService.getEntries(this.entriesCount);
    this.filteredData$ = this.entryService.getFilteredEntries('');
  }

  onInput(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.filteredData$ = this.entryService.getFilteredEntries(this.filter);
  }
}
