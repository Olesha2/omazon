export class productSearch {
  id_tovar: number;
  id_images: number;
  name: string;
  category: string;
  dateloss: number;
  rate: number;
  minRate: number;

  constructor(
    values: object
  ) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}
