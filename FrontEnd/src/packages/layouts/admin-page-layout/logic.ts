export const flattenChildren = (data: any) => {
  return data.flatMap((item: any) => [
    {
      key: item.key,
      path: item.path,
      mainMenuTitle: item.mainMenuTitle,
      mainMenuKey: item.mainMenuKey,
      permissionCode: item.permissionCode,
    },
    ...(item.children || []),
  ]);
};
