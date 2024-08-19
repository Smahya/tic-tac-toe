/* eslint-disable @typescript-eslint/no-explicit-any */
export const getDeepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
