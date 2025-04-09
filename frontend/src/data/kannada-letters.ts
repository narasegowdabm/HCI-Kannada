// src/data/kannada-letters.ts

import type { KannadaLetter } from "../types/letter";

/**
 * A comprehensive list of Kannada characters with multiple example words for each.
 */
export const kannadaLetters: KannadaLetter[] = [
  // Vowels (14)
  { letter: "ಅ",  transliteration: "a",   type: "vowel",     color: "bg-kid-blue",    exampleWords: ["ಅಮ್ಮ", "ಅಕ್ಕ", "ಅಪ್ಪ"] },
  { letter: "ಆ",  transliteration: "aa",  type: "vowel",     color: "bg-kid-purple",  exampleWords: ["ಆನೆ", "ಆಟ", "ಆರು"] },
  { letter: "ಇ",  transliteration: "i",   type: "vowel",     color: "bg-kid-yellow",  exampleWords: ["ಇಲಿ", "ಇಂಡ", "ಇದು"] },
  { letter: "ಈ",  transliteration: "ii",  type: "vowel",     color: "bg-kid-green",   exampleWords: ["ಈಜು", "ಈರು", "ಈದು"] },
  { letter: "ಉ",  transliteration: "u",   type: "vowel",     color: "bg-kid-pink",    exampleWords: ["ಉಪ್ಪು", "ಉಡುಗ", "ಉದಯ"] },
  { letter: "ಊ",  transliteration: "uu",  type: "vowel",     color: "bg-kid-orange",  exampleWords: ["ಊಟ", "ಊರು", "ಊಣಿ"] },
  { letter: "ಋ",  transliteration: "ru",  type: "vowel",     color: "bg-kid-blue",    exampleWords: ["ಋತು", "ಋಣ", "ಋಷಿ"] },
  { letter: "ೠ",  transliteration: "r̄u", type: "vowel",     color: "bg-kid-purple",  exampleWords: ["ೠ", "ೠ"] /* rare */ },
  { letter: "ಎ",  transliteration: "e",   type: "vowel",     color: "bg-kid-yellow",  exampleWords: ["ಎಲೆ", "ಎಲ್ಲ", "ಎದರು"] },
  { letter: "ಏ",  transliteration: "ee",  type: "vowel",     color: "bg-kid-green",   exampleWords: ["ಏನು", "ಏಕ", "ಏರಡು"] },
  { letter: "ಐ",  transliteration: "ai",  type: "vowel",     color: "bg-kid-pink",    exampleWords: ["ಐದು", "ಐಶ್ವರ್ಯ", "ಐಕೆ"] },
  { letter: "ಒ",  transliteration: "o",   type: "vowel",     color: "bg-kid-orange",  exampleWords: ["ಒಂಟೆ", "ಒಂದು", "ಒಳ"] },
  { letter: "ಓ",  transliteration: "oo",  type: "vowel",     color: "bg-kid-blue",    exampleWords: ["ಓದು", "ಓಟ", "ಓರ್ವ"] },
  { letter: "ಔ",  transliteration: "au",  type: "vowel",     color: "bg-kid-purple",  exampleWords: ["ಔಷಧಿ", "ಔಟ", "ಔತಣ"] },
  { letter: "ಅಂ", transliteration: "am",  type: "vowel",     color: "bg-kid-purple",  exampleWords: ["ಅಂಕ", "ಅಂದು", "ಅಂಗ"] },
  { letter: "ಅಃ", transliteration: "aha", type: "vowel",     color: "bg-kid-purple",  exampleWords: ["ಅಃಕಾರ", "ಅಃಶಬ್ದ"] },

  // Consonants (35)
  { letter: "ಕ",  transliteration: "ka",  type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಕುದುರೆ", "ಕಡಿ", "ಕಾಲ"] },
  { letter: "ಖ",  transliteration: "kha", type: "consonant", color: "bg-kid-green",   exampleWords: ["ಖರ್ಗ", "ಖಡಿ", "ಖರಿ"] },
  { letter: "ಗ",  transliteration: "ga",  type: "consonant", color: "bg-kid-pink",    exampleWords: ["ಗಗನ", "ಗಣಿ", "ಗಾಳ"] },
  { letter: "ಘ",  transliteration: "gha", type: "consonant", color: "bg-kid-orange",  exampleWords: ["ಘಂಟೆ", "ಘರಿ", "ಘನ"] },
  { letter: "ಙ",  transliteration: "nga", type: "consonant", color: "bg-kid-blue",    exampleWords: ["ಅಂಗಡಿ", "ಙಗ", "ಙಙ"] },

  { letter: "ಚ",  transliteration: "cha", type: "consonant", color: "bg-kid-purple",  exampleWords: ["ಚಾಕು", "ಚಳಿ", "ಚಾಪ"] },
  { letter: "ಛ",  transliteration: "chha",type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಛತ್ರಿ", "ಛಲ", "ಛಕ"] },
  { letter: "ಜ",  transliteration: "ja",  type: "consonant", color: "bg-kid-green",   exampleWords: ["ಜಾನಪದ", "ಜಲ", "ಜಾರಿ"] },
  { letter: "ಝ",  transliteration: "jha", type: "consonant", color: "bg-kid-pink",    exampleWords: ["ಝಲಕ", "ಝರ", "ಝಿಂಜ"] },
  { letter: "ಞ",  transliteration: "nya", type: "consonant", color: "bg-kid-orange",  exampleWords: ["ಜ್ಞಾನ", "ಞಾಣ", "ಞಪ"] },

  { letter: "ಟ",  transliteration: "ṭa",  type: "consonant", color: "bg-kid-blue",    exampleWords: ["ಟೊಪ್ಪಿ", "ಟಪ", "ಟಣ"] },
  { letter: "ಠ",  transliteration: "ṭha", type: "consonant", color: "bg-kid-purple",  exampleWords: ["ಠೇವಣಿ", "ಠಟ", "ಠಕ"] },
  { letter: "ಡ",  transliteration: "ḍa",  type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಡೊಳ್ಳೆ", "ಡಾ", "ಡಣ"] },
  { letter: "ಢ",  transliteration: "ḍha", type: "consonant", color: "bg-kid-green",   exampleWords: ["ಢೋಣ", "ಢಣ", "ಢಪ"] },
  { letter: "ಣ",  transliteration: "ṇa",  type: "consonant", color: "bg-kid-pink",    exampleWords: ["ಣ", "ಣದ", "ಣಣ"] },

  { letter: "ತ",  transliteration: "ta",  type: "consonant", color: "bg-kid-orange",  exampleWords: ["ತಲೆ", "ತನ", "ತಣ"] },
  { letter: "ಥ",  transliteration: "tha", type: "consonant", color: "bg-kid-blue",    exampleWords: ["ಥಾಳಿ", "ಥನ", "ಥಣ"] },
  { letter: "ದ",  transliteration: "da",  type: "consonant", color: "bg-kid-purple",  exampleWords: ["ದಾರಿ", "ದನ", "ದಣ"] },
  { letter: "ಧ",  transliteration: "dha", type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಧನು", "ಧರ", "ಧಣ"] },
  { letter: "ನ",  transliteration: "na",  type: "consonant", color: "bg-kid-green",   exampleWords: ["ನದಿ", "ನನ", "ಣನ"] },

  { letter: "ಪ",  transliteration: "pa",  type: "consonant", color: "bg-kid-pink",    exampleWords: ["ಪುಸ್ತಕ", "ಪನ", "ಪಣ"] },
  { letter: "ಫ",  transliteration: "pha", type: "consonant", color: "bg-kid-orange",  exampleWords: ["ಫಲ", "ಫನ", "ಫಣ"] },
  { letter: "ಬ",  transliteration: "ba",  type: "consonant", color: "bg-kid-blue",    exampleWords: ["ಬಾಲ", "ಬನ", "ಬಣ"] },
  { letter: "ಭ",  transliteration: "bha", type: "consonant", color: "bg-kid-purple",  exampleWords: ["ಭಯ", "ಭನ", "ಭಣ"] },
  { letter: "ಮ",  transliteration: "ma",  type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಮಳೆ", "ಮನ", "ಮಣ"] },

  { letter: "ಯ",  transliteration: "ya",  type: "consonant", color: "bg-kid-green",   exampleWords: ["ಯಾನ", "ಯನ", "ಯಣ"] },
  { letter: "ರ",  transliteration: "ra",  type: "consonant", color: "bg-kid-pink",    exampleWords: ["ರಥ", "رن", "ರಣ"] },
  { letter: "ಲ",  transliteration: "la",  type: "consonant", color: "bg-kid-orange",  exampleWords: ["ಲತೆ", "ಲನ", "ಲಣ"] },
  { letter: "ವ",  transliteration: "va",  type: "consonant", color: "bg-kid-blue",    exampleWords: ["ವಾಣಿ", "ವನ", "ವಣ"] },

  { letter: "ಶ",  transliteration: "sha", type: "consonant", color: "bg-kid-purple",  exampleWords: ["ಶಾಲೆ", "ಶನ", "ಶಣ"] },
  { letter: "ಷ",  transliteration: "ṣha",type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಷಟ್ಕೋನ", "ಷನ", "ಷಣ"] },
  { letter: "ಸ",  transliteration: "sa",  type: "consonant", color: "bg-kid-green",   exampleWords: ["ಸೂರ್ಯ", "ಸನ", "ಸಣ"] },
  { letter: "ಹ",  transliteration: "ha",  type: "consonant", color: "bg-kid-pink",    exampleWords: ["ಹಣ್ಣು", "ಹನ", "ಹಣ"] },

  { letter: "ಳ",  transliteration: "ḷa",  type: "consonant", color: "bg-kid-orange",  exampleWords: ["ಳ", "ಳನ", "ಳಣ"] },
  { letter: "ೞ",  transliteration: "ḻa",  type: "consonant", color: "bg-kid-blue",    exampleWords: ["ೞ", "ೞನ", "ೞಣ"] },
  { letter: "ಕ್ಷ", transliteration: "kṣa", type: "consonant", color: "bg-kid-purple",  exampleWords: ["ಕ್ಷೇತ್ರ", "ಕ್ಷಮೆ", "ಕ್ಷಿತಿಜ"] },
  { letter: "ಜ್ಞ", transliteration: "jña", type: "consonant", color: "bg-kid-yellow",  exampleWords: ["ಜ್ಞಾನ", "ಜ್ಞಾಪನೆ", "ಜ್ಞೇಯ"] },
];
