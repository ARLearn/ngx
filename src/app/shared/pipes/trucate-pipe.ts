import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateString',
})
export class TrucatePipe implements PipeTransform {
    transform(fullStr: string, strLen: number, separator: string): any {
        if (fullStr.length < strLen) {
            return fullStr;
        }

        separator = separator || '...';

        const sepLen = separator.length,
            charsToShow = strLen - sepLen,
            frontChars = Math.ceil(charsToShow / 2),
            backChars = Math.floor(charsToShow / 2);

        return (
            fullStr.substr(0, frontChars) +
            separator +
            fullStr.substr(fullStr.length - backChars)
        );
    }
}
