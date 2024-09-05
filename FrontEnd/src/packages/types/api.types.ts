export interface ApiResponse<T> {
  isSuccess: boolean;
  data?: T;
  message?: string;
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

export interface CategoryResponse {
  CategoryCode: string;
  CategoryName: string;
  CategoryParentCode: string;
  CategoryDesc: string;
  FlagActive: string;
}

export interface BlogResponse {
  blog_id: any;
  blog_title: string;
  blog_content: string;
  image_url: string;
  blog_author: string;
  created_at: any;
  updated_at: any;
  createdAt: any;
  updatedAt: any;
}
