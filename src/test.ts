// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
// Then we find all the tests.
declare function require(id: string): {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ) => { keys: () => string[]; resolve: (id: string) => string };
};
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);
