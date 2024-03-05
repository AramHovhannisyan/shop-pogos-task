export type measureType = "piece" | "gram";

export interface CreateProductBody {
  title: string;
  price: number;
  measureType: measureType;
  count: number;
}

export interface productBody {
  title: string;
  price: number;
  measureType: measureType;
  count: number;
}
