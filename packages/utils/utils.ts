export const validateCommonSize = (val: string) => {
  return ["", "large", "medium", "small", "mini"].includes(val);
};
