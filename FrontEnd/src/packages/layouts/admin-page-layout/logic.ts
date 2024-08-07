export const flattenChildren = (data: any) => {
  return data?.reduce((acc: any, item: any) => {
    if (item.children) {
      acc.push(...item.children);
    }
    return acc;
  }, []);
};
