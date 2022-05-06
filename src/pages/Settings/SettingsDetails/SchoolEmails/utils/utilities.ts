export function hasAllKeys(text: string, neededKeys: string[]): boolean {
  const newValueMatches: string[] | null = text.match(/(?<=\[)[^\][]*(?=])/g);

  let hasKey = true;

  if (newValueMatches) {
    neededKeys.forEach((value) => {
      if (!newValueMatches.includes(value)) {
        hasKey = false;
      }
    });
  } else {
    hasKey = false;
  }

  return hasKey;
}
