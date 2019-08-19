import { Injectable } from '@angular/core';
import * as randomWords from 'random-words';
import { IEntry } from '../../common/models/IEntry';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  entries$: BehaviorSubject<IEntry[]>;

  constructor() {
    this.entries$ = new BehaviorSubject([]);
  }

  getEntries(entriesCount: number) {
    const entriesList: IEntry[] = [];
    for (let index = 0; index < entriesCount; index++) {
        entriesList.push(this.generateRandomEntry());
      }
    this.entries$.next(entriesList);
  }

  getFilteredEntries(filter: string) {
    return this.entries$.pipe(
      map((entries: IEntry[]) => this.filterEntries(filter, entries))
    );
  }

  private filterEntries(filter: string, entries: IEntry[]): IEntry[] {
    if (!entries) {
      return entries;
    }
    if (!filter) {
      return entries.slice();
    }

    // With this regular expression we find each keyword inside the phrase.
    // Regardless of whatever characters (or full words) are between each keyword.
    const regExp = new RegExp( '\\b' + filter.replace(/\s/g, '.*') + '\\b', 'i');
    return entries.filter(entry => regExp.test(entry.name)
    || regExp.test(entry.description)
    || entry.status.indexOf(filter) !== -1);
  }

  private generateRandomEntry(): IEntry {
    return {
      name: randomWords({exactly: 3, join: ' '}),
      description: randomWords({exactly: 100, join: ' '}),
      status: ['new', 'submitted', 'failed'][Math.floor(Math.random() * 3)]
    };
  }
}
