// src/types/letter.ts

/**
 * Describes a single Kannada letter and its metadata.
 */
export interface KannadaLetter {
  /** The Kannada glyph, e.g. "ಅ" */
  letter: string;
  /** Latin transliteration, e.g. "a" */
  transliteration: string;
  /** Whether it's a vowel or consonant */
  type: "vowel" | "consonant";
  /** Tailwind CSS background color class, e.g. "bg-kid-blue" */
  color: string;
  /** A list of Kannada words that begin with this letter */
  exampleWords: string[];
}
