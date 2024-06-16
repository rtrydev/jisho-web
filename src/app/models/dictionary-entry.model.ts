export interface DictionaryEntry {
    word: string;
    translation: string;
    reading: string;
    example_sentences: {
        sentence: string;
        translation: string;
    }[];
}
