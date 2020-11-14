export class ProductsEdit {
  name: string;
  id_category: string;
  samaStavka: number;
  about: string;
  min_rate: number;
  photos: [];
  constructor(
    values: object
  ) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}
