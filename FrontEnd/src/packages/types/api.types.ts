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
export interface UploadedFile {
  FileId: string;
  NodeID: string;
  NetworkID: string;
  SolutionCode: string;
  FileUrlLocal: string;
  FileUrlFS: string;
  FileFullName: string;
  FileType: string;
  FileSize: number;
  FileContent: string;
  RefNo: string;
  RefType: string;
  FileIdDelete: string;
  CreateDTimeUTC: string;
  CreateBy: string;
  LUDTimeUTC: string;
  LUBy: string;
  UpdDTimeUTC: string;
  UpdBy: string;
  DeleteDTimeUTC: string;
  DeleteBy: string;
  FlagIsDeleted: string;
  FlagIsRecycle: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
  isUploading?: boolean;
  Idx?: any;
}
