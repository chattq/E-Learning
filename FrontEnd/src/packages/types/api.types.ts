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
  blog_id: 8;
  blog_title: "Lập trình Python";
  blog_content: "Python là một ngôn ngữ lập trình phổ biến được thiết kế bởi Guido van Rossum và được phát hành lần đầu vào năm 1991. Python là ngôn ngữ lập trình thông dịch, có nghĩa là mã nguồn Python được thực thi theo từng dòng từ trên xuống dưới. Python hỗ trợ cả lập trình hướng đối tượng và hướng thủ tục nội tại, giúp lập trình viên có thể sử dụng mô hình phù hợp với yêu cầu của dự án.\nPython nổi tiếng với cú pháp rõ ràng, dễ đọc, giúp giảm thiểu đáng kể thời gian cần thiết để viết và kiểm tra mã nguồn. Python được ứng dụng rộng rãi trong nhiều lĩnh vực như phân tích dữ liệu, học máy, phát triển web, tự động hóa, và nhiều hơn nữa.\nPython cũng có một cộng đồng lập trình viên lớn mạnh, nơi mà bạn có thể tìm thấy hàng ngàn thư viện và framework hỗ trợ. Một số thư viện nổi tiếng bao gồm NumPy và Pandas dành cho tính toán khoa học và phân tích dữ liệu, TensorFlow và PyTorch dành cho học máy, và Django và Flask dành cho phát triển web.\nPython là một công cụ mạnh mẽ và linh hoạt, phù hợp cho cả người mới học lập trình và những lập trình viên kỹ năng cao và được sử dụng rộng rãi trong nhiều lĩnh vực khác nhau. \nCho đến năm 2018, Java là một trong những ngôn ngữ được dùng phổ biến nhất trên thế giới, đặc biệt cho các úng dựng web client- server. Theo thống kê trên thế giới có khoảng 9 triệu lập trình viên Java";
  image_url: "https://i.pinimg.com/564x/b3/1a/d0/b31ad041618be7f3dce0160b9385f2d8.jpg";
  blog_author: "Tuệ";
  created_at: "2024-08-28T03:04:45.119Z";
  updated_at: null;
  createdAt: "2024-08-28T03:04:45.120Z";
  updatedAt: "2024-08-28T03:04:45.120Z";
}
