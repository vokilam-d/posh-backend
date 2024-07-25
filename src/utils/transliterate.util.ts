export function transliterate(word: string, substituteUnderscores: boolean = true): string {
  let transliterated = word
    .toLowerCase()
    .replace('ьо', 'ё')
    .replace('є', 'е')
    .replace('ши', 'шы')
    .replace('жи', 'жы')
    .split('')
    .map(char => transliterationMap[char] || char)
    .join('');

  const spacesRegex = substituteUnderscores ? spacesOrUnderscores : spaces;
  const notAlphaNumericDashDotRegex = substituteUnderscores ? notAlphaNumericDashDotUnderscore : notAlphaNumericDashDot;
  transliterated = transliterated
    .replace(spacesRegex, '-')
    .replace(notAlphaNumericDashDotRegex, '')
    .replace(multipleDashes, '-');

  return transliterated;
}

const notAlphaNumericDashDot = /[^a-z0-9\-.]/g;
const notAlphaNumericDashDotUnderscore = /[^a-z0-9\-._]/g;
const spacesOrUnderscores = /\s+|_+/g;
const spaces = /\s+/g;
const multipleDashes = /-+/g;
// eslint-disable-next-line
const transliterationMap = { 'ё':'yo','й':'i','ц':'ts','у':'u','к':'k','е':'e','н':'n','г':'g','ш':'sh','щ':'sch','з':'z','х':'h','ъ':'','ф':'f','ы':'y','в':'v','а':'a','п':'p','р':'r','о':'o','л':'l','д':'d','ж':'zh','э':'e','я':'ya','ч':'ch','с':'s','м':'m','и':'i','і':'i','т':'t','ь':'','б':'b','ю':'yu' };
