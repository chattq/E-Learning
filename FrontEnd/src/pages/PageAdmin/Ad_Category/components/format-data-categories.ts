export const formatDataCategories = (data: any, parentCode = "") => {
  return data
    ?.filter((item: any) => item.CategoryParentCode === parentCode)
    .map((item: any) => {
      const children = formatDataCategories(data, item.CategoryCode);
      if (children.length > 0) {
        item.children = children;
      }
      return item;
    });
};
