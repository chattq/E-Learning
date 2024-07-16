export interface IProductCart {
  idProduct: string;
  title: string;
  price: number;
  numberLectures: number; // số bài giảng
  level: string;
  discount: number;
  quantity: number;
  image: string;
}

export interface ICartPage {
  idShop: string;
  ImageShop: string;
  NameShop: string;
  ProductCart: IProductCart[];
  VoucherShop: [];
}
