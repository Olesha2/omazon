export class Product {
  id_tovar: number;
  id_category: number;
  name: string;
  min_rate: number = 0;
  image: string;
  about: string;
  category_name: string;
  samaStavka: string;
  dayloss: number;
  cliName: string;
  cliEmail: string;

  constructor(
    values: object
  ) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}
