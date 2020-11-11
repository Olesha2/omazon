export class clientProducts {
  id_tovar: number;

  Name: string;
  daysLost: string;
  imgAddr: string;
  SamaStavka: number;

  constructor(
    values: object
  ) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}
