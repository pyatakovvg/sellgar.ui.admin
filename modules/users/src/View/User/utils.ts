export const normalizeFullName = (firstName: string, middleName: string, lastName: string) => {
  return `${lastName} ${firstName.slice(0, 1).toUpperCase()}.${middleName.slice(0, 1).toUpperCase()}.`;
};
