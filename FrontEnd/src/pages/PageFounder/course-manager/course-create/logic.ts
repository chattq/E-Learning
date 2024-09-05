export const formatDataCategoriesCourse = (data: any, parentCode = "") => {
  return data
    ?.filter((item: any) => item.CategoryParentCode === parentCode)
    .map((item: any) => {
      const children = formatDataCategoriesCourse(data, item.CategoryCode);
      item.label = item.CategoryName;
      item.value = item.CategoryCode;
      item.children = children.length > 0 ? children : [];
      return {
        ...item,
        value: item.CategoryCode,
        label: item.CategoryName,
      };
    });
};
