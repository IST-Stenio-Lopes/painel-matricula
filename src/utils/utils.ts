const validImgTypes = [
  'jpg',
  'jpeg',
  'png',
];

export function checkImgType(name: string): boolean {
  const type = name.split('.');

  return validImgTypes.includes(type[type.length - 1]);
}
