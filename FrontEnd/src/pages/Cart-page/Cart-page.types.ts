export interface ICourseCart {
  IdCourse: string;
  CourseName: string;
  CoursePrice: number;
  CourseLectures: number; // số bài giảng
  CourseLevel: string;
  CourseDiscount: number;
  CourseQty: number;
  CourseImage: string;
  isSelected: boolean;
}

export interface ICartPage {
  idShop: string;
  ImageShop: string;
  NameShop: string;
  CourseCart: ICourseCart[];
  isSelectedAll: boolean;
  FlagProductChoose: string;
  VoucherShop: [];
}
