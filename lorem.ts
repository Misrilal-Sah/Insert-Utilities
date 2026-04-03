/**
 * Lorem Ipsum text generator.
 * No external dependencies — all generation is done in-memory using
 * a curated word list and structural rules for realistic output.
 */

/** Classic Lorem Ipsum word pool — 100+ authentic words */
const LOREM_WORDS: string[] = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet',
  'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod',
  'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex',
  'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in',
  'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
  'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum', 'porta', 'nibh',
  'venenatis', 'cras', 'fermentum', 'odio', 'eu', 'feugiat',
  'pretium', 'iaculis', 'nunc', 'blandit', 'volutpat', 'maecenas',
  'pharetra', 'convallis', 'posuere', 'morbi', 'leo', 'urna',
  'molestie', 'at', 'elementum', 'risus', 'viverra', 'mauris',
  'augue', 'neque', 'gravida', 'pellentesque', 'dignissim',
  'suspendisse', 'faucibus', 'interdum', 'lacus', 'vel', 'facilisis',
  'volutpat', 'purus', 'semper', 'auctor', 'neque', 'vitae',
  'tempus', 'quam', 'pellentesque', 'nec', 'nam', 'aliquam',
  'lectus', 'proin', 'libero', 'nunc', 'consequat', 'interdum',
  'varius', 'metus', 'dictum', 'adipiscing', 'vitae', 'congue',
  'mattis', 'rhoncus', 'tincidunt', 'arcu', 'accumsan', 'lacus',
  'vel', 'facilisis'
];

/** Classic opening sentence used when startWithClassic is true */
const CLASSIC_OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

/**
 * Returns a random integer in the inclusive range [min, max].
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random word from the LOREM_WORDS list.
 */
function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

/**
 * Capitalizes the first character of a string.
 */
function capitalize(word: string): string {
  if (!word) { return word; }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Returns the single classic Lorem Ipsum opening sentence.
 *
 * Output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 */
export function generateLoremSentence(): string {
  return CLASSIC_OPENING;
}

/**
 * Generates a block of Lorem Ipsum text with the given word count.
 * The text is structured into realistic sentences and paragraphs:
 *   - Sentences start with a capital letter and end with a period
 *   - Commas appear every 8–15 words within a sentence
 *   - Sentences are 12–20 words long
 *   - Paragraphs are separated by double newlines every 40–60 words
 *
 * @param wordCount - Target number of words to generate
 * @param startWithClassic - If true, prefix with the classic Lorem opening
 * @returns Formatted multi-paragraph Lorem Ipsum string
 */
export function generateLorem(wordCount: number, startWithClassic: boolean): string {
  const words: string[] = [];

  // Subtract the opening words if we're using the classic prefix
  const classicWordCount = startWithClassic ? 8 : 0;
  const remainingWords = Math.max(1, wordCount - classicWordCount);

  // Build the word list
  for (let i = 0; i < remainingWords; i++) {
    words.push(randomWord());
  }

  // --- Build structured text from words ---
  let output = startWithClassic ? CLASSIC_OPENING + ' ' : '';

  let wordIndex = 0;
  let wordsInCurrentSentence = 0;
  let wordsInCurrentParagraph = startWithClassic ? 8 : 0;
  let nextCommaAt = randomInt(8, 15);         // Words until next comma
  let nextSentenceEnd = randomInt(12, 20);     // Words until sentence end
  let nextParagraphEnd = randomInt(40, 60);    // Words until paragraph break

  // Track if the next word should be capitalized (start of sentence)
  let capitalizeNext = !startWithClassic;

  while (wordIndex < words.length) {
    const word = words[wordIndex];
    const displayWord = capitalizeNext ? capitalize(word) : word;
    capitalizeNext = false;

    wordsInCurrentSentence++;
    wordsInCurrentParagraph++;
    wordIndex++;

    const isLastWord = wordIndex >= words.length;

    if (isLastWord) {
      // Always end the text with a period
      output += displayWord + '.';
    } else if (wordsInCurrentParagraph >= nextParagraphEnd) {
      // End paragraph: period + double newline
      output += displayWord + '.\n\n';
      wordsInCurrentSentence = 0;
      wordsInCurrentParagraph = 0;
      capitalizeNext = true;
      nextCommaAt = randomInt(8, 15);
      nextSentenceEnd = randomInt(12, 20);
      nextParagraphEnd = randomInt(40, 60);
    } else if (wordsInCurrentSentence >= nextSentenceEnd) {
      // End sentence: period + space
      output += displayWord + '. ';
      wordsInCurrentSentence = 0;
      capitalizeNext = true;
      nextCommaAt = randomInt(8, 15);
      nextSentenceEnd = randomInt(12, 20);
    } else if (wordsInCurrentSentence === nextCommaAt) {
      // Add comma mid-sentence
      output += displayWord + ', ';
      nextCommaAt += randomInt(8, 15);
    } else {
      // Normal word with space
      output += displayWord + ' ';
    }
  }

  return output.trimEnd();
}

/**
 * Generates a specified number of Lorem Ipsum paragraphs.
 * Each paragraph is 40–80 words, separated by double newlines.
 *
 * @param paragraphCount - The number of paragraphs to generate
 * @returns Multi-paragraph Lorem Ipsum string
 */
export function generateLoremParagraphs(paragraphCount: number): string {
  const paragraphs: string[] = [];

  for (let i = 0; i < paragraphCount; i++) {
    const wordCount = randomInt(40, 80);
    const startWithClassic = i === 0; // Only first paragraph uses classic opening
    paragraphs.push(generateLorem(wordCount, startWithClassic));
  }

  return paragraphs.join('\n\n');
}
