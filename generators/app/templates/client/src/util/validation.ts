export const required = (msg: string) => (value: any) =>
  value ? undefined : msg;
