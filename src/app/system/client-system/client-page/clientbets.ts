export class clientbets {
  Name: string;
  SamaStavka: number;
  StavkaClienta: number;
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
