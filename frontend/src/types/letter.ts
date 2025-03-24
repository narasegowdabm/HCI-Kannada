export interface KannadaLetter {
    letter: string;
    transliteration: string;
    type: 'vowel' | 'consonant';
    color: string;
    pathData?: string; // SVG path data for letter shape
  }
  
  export interface TracingMetrics {
    accuracy: number;
    coverage: number;
    smoothness: number;
  }