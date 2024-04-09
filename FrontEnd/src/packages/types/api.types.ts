export interface ApiResponse<T> {
  isSuccess: boolean;
  // errorCode: string;
  // errorInfo?: errorInfo;
  // debugInfo: object;
  _strErrCode: string;
  _strTId?: string;
  _strAppTId?: string;
  _objTTime?: string;
  _strType?: string;
  _dicDebug: object;

  DataList?: T[];
  Data?: T;
  ItemCount?: number;
  PageCount?: number;
  PageIndex?: number;
  PageSize?: number;
}
