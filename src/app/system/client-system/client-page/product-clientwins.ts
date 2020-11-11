export class productClientwins {
  id_stavka: number;
  Name: string;
  SamaStavka: number;
  id_tovar: number;
  dayloss: number;

  constructor(
    values: object
  ) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}
