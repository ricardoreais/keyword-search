import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IEntry } from '../common/models/IEntry';
import { EntryService } from './services/entry.service';
import { HighlightSearchPipe } from '../common/pipes/highlight-search-pipe';

@Component({
  standalone: true,
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  imports: [AsyncPipe, FormsModule, NgxPaginationModule, HighlightSearchPipe]
})
export class Test1Component implements OnInit {
  private entryService = inject(EntryService);

  filter!: string;
  filteredData$: Observable<IEntry[]> | undefined;
  entriesCount = 50000;
  page = 1;
  pageSize = 20;
  timeoutHandle!: number;

  ngOnInit() {
    this.entryService.getEntries(this.entriesCount);
    this.filteredData$ = this.entryService.getFilteredEntries('');
  }

  updateFilter() {
    if (!this.filter || this.filter.length > 0) {
      window.clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = window.setTimeout(() => {
      this.filteredData$ = this.entryService.getFilteredEntries(this.filter);
    }, 300);
  }
}
