export interface Product {
  productname: string;
  cardtype: string;
  color: string;
  cardtext: string;
  expansion: string;
  cmc: number;
  image: string;
  _id: string;
  price: number;
  producttype: string;
  view: boolean;
  rating: number;
  categories: Categories[];
  stock: number;
}

export interface Categories {
  _id: string;
  catName: string
}
