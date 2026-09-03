export function generateProtocol(): string {
  const year = new Date().getFullYear();
  const n = 1000 + Math.floor(Math.random() * 9000);
  return `OS-${year}-${n}`;
}
