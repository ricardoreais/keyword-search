import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'highlight'
})

export class HighlightSearchPipe implements PipeTransform {
    transform(value: string, args: string): string {
        if (!args) {return value; }
        const keywords = args.match(/\S+/g) || [];
        for (const keyword of keywords) {
            const regText = new RegExp(keyword, 'gi');
            value = value.replace(regText, '<mark>' + keyword + '</mark>');
        }
        return value;
    }
}
