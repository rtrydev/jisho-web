import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendHints',
  standalone: true
})
export class AppendHintsPipe implements PipeTransform {
  transform(sentence: string, readingHints: { word: string, reading: string }[]): string {
    if (!sentence || !readingHints || readingHints.length === 0) {
      return sentence;
    }

    readingHints.forEach(hint => {
      const regex = new RegExp(`(<ruby>[\\s\\S]*?<\\/ruby>|${hint.word})`, 'g');
      let match;
      const newSentenceParts = [];
      let lastIndex = 0;

      while ((match = regex.exec(sentence)) !== null) {
        if (match[0].startsWith('<ruby>')) {
          newSentenceParts.push(sentence.slice(lastIndex, match.index));
          newSentenceParts.push(match[0]);
        } else {
          newSentenceParts.push(sentence.slice(lastIndex, match.index));
          const replacement = `<ruby>${hint.word}<rt>${hint.reading}</rt></ruby>`;
          newSentenceParts.push(replacement);
        }
        lastIndex = regex.lastIndex;
      }

      newSentenceParts.push(sentence.slice(lastIndex));
      sentence = newSentenceParts.join('');
    });

    console.log(`Sentence: ${sentence} Hints: ${JSON.stringify(readingHints)}`);

    return sentence;
  }
}
