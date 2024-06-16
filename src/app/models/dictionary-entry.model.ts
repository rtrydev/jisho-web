export interface DictionaryEntry {
    word: string;
    translation: string;
    reading: string;
    example_sentences: {
        sentence: string;
        reading_hints: {
            word: string;
            reading: string
        }[];
        translation: string;
    }[];
}
