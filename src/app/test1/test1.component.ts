import {Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntry } from '../common/models/IEntry';
import { EntryService } from './services/entry.service';


@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  filter: string;
  filteredData$: Observable<IEntry[]>;
  entriesCount = 50000;
  page = 1;
  pageSize = 20;
  timeoutHandle: number;

  constructor(private entryService: EntryService) {
  }

  ngOnInit() {
    this.entryService.getEntries(this.entriesCount);
    this.filteredData$ = this.entryService.getFilteredEntries('');
  }

  updateFilter() {
    // I added this delay of 300ms to avoid an intensive filtering everytime an user presses a key.
    if (!this.filter || this.filter.length > 0) {
      window.clearTimeout(this.timeoutHandle);
    }
    // Our callback will only run once the user has stopped writing (this could be an API call).
    this.timeoutHandle = window.setTimeout(() => {
      this.filteredData$ = this.entryService.getFilteredEntries(this.filter);
    }, 300);
  }
}
