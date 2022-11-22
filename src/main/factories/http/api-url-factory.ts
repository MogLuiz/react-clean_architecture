export const MakeApiUrlFactory = (path: string): string => {
  return `${process.env.API_URL}${path}`;
};
