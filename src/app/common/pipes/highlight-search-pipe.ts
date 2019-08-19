import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightSearchPipe implements PipeTransform {
    transform(value: any, args: any): any {
        if (!args) {return value; }
        // Remove trailing whitespaces from the search phrase and split it into keywords.
        const keywords = args.trim(/\S+/g).split(' ');
        for (const keyword of keywords) {
            const regText = new RegExp(keyword, 'gi');
            value = value.replace(regText, '<mark>' + keyword + '</mark>');
        }
        return value;
    }
}
