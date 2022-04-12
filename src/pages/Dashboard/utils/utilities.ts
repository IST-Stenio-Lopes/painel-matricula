export function getTimeDiff(date: string): string {
  const diff = Math.abs(new Date().getTime() - new Date(date).getTime());

  let seconds = Math.floor((diff / 1000));
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const dDisplay = d > 0 ? `${d}d ` : '';
  const hDisplay = h > 0 ? `${h}h ` : '';
  const mDisplay = m > 0 ? `${m}m` : '';
  return `${dDisplay + hDisplay + mDisplay} atrás`;
}
