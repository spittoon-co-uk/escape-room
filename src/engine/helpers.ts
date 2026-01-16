/**
 * Converts a number to its ordinal string representation.
 * 
 * @param count - The number to convert (e.g., 1, 2, 3, 11, 21)
 * @returns The ordinal string (e.g., "first", "second", "3rd", "11th", "21st")
 * 
 * @example
 * getOrdinal(1)  // "first"
 * getOrdinal(8)  // "eighth"
 * getOrdinal(21) // "21st"
 * getOrdinal(42) // "42nd"
 */
export const getOrdinal = (count: number): string => {
  const ordinals = [
    "",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
  ];

  if (count <= 10 && count > 0) {
    return ordinals[count]!;
  }

  // Handle proper ordinal suffixes for numbers > 10
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  // Special cases: 11th, 12th, 13th
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${count}th`;
  } else if (lastDigit === 1) {
    return `${count}st`;
  } else if (lastDigit === 2) {
    return `${count}nd`;
  } else if (lastDigit === 3) {
    return `${count}rd`;
  } else {
    return `${count}th`;
  }
};

/**
 * Determines the correct indefinite article ("a" or "an") for an ordinal string.
 * 
 * @param ordinal - The ordinal string to check (e.g., "first", "8th", "eleventh")
 * @returns "an" if the ordinal sounds like it starts with a vowel, otherwise "a"
 * 
 * @example
 * getArticle("first")    // "a"
 * getArticle("eighth")   // "an"
 * getArticle("11th")     // "an"
 * getArticle("21st")     // "a"
 */
export const getArticle = (ordinal: string): string => {
  // Use "an" for ordinals that sound like they start with a vowel (eighth, eleventh, eighteenth, etc.)
  return ordinal.match(/^(8|11|18)/) || ordinal.match(/^[aeiou]/) ? "an" : "a";
};
