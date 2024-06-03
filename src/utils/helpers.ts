export function shortenHexString(hexString:string, prefixLength = 4, suffixLength = 6) {
    if (!/^0x[0-9a-fA-F]+$/.test(hexString)) {
      throw new Error('Invalid hexadecimal string format');
    }
  
    const prefix = hexString.slice(0, prefixLength + 2);
    const suffix = hexString.slice(-suffixLength);
  
    return `${prefix}...${suffix}`;
  }

  export function shortenWord(word:string, maxLength:number) {  
    if (word.length <= maxLength) {
      return word;
    }
  
    const shortenedWord = word.substring(0, maxLength - 3) + '...';
    return shortenedWord;
  }

  