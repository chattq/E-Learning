export interface ApiResponse<T> {
  isSuccess: boolean;
  data?: T;
  message?: string;
}
export interface UploadedFile {
  FileName: string;
  FileSize: number;
  FileType: string;
  FileUrl: string;
  TimeUpload: string;
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
