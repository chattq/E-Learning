export interface RouteItem {
  key: string;
  path: string;
  pageTitle?: string;
  mainMenuTitle?: string;
  subMenuTitle?: string;
  mainMenuKey?: string;
  subMenuKey?: string;
  permissionCode?: string;
  getPageElement?: Function;
  children?: RouteItem[];
  icon?: string | any;
}
