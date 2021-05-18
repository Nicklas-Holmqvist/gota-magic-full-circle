export interface ShippingMethod {
  name: string;
  deliveryTime: string;
  price: number;
  id: number;
}

export const shippingMethods: ShippingMethod[] = [
  {
    name: "Postnord",
    deliveryTime: "2021-05-30",
    price: 9,
    id: 1,
  },
  {
    name: "EarlyBird",
    deliveryTime: "2021-04-26",
    price: 29,
    id: 2,
  },
  {
    name: "Instabox",
    deliveryTime: "2021-04-23",
    price: 19,
    id: 3,
  },
  {
    name: "Brevduva",
    deliveryTime: "2021-04-21",
    price: 0,
    id: 4,
  },
  {
    name: "Magic Shipping",
    deliveryTime: "Om en timma!",
    price: 199,
    id: 5,
  },
];
