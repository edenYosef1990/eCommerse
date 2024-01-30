import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({
  standalone: true,
  name: 'limitBeforeBreak',
})
export class BreakTextToLinesPipe implements PipeTransform {
  transform(text: string, limitBeforeBreak = 20): string {
    let newText = '';
    let index = limitBeforeBreak;
    for (; index < text.length; index = index + limitBeforeBreak) {
      newText +=
        text.slice(index - limitBeforeBreak, index) +
        `${text[index] && text[index] !== ' ' ? '-' : ''}\n`;
    }
    newText += text.slice(index - limitBeforeBreak);
    return newText;
  }
}
