export class imageg {
  id_image: number;

  constructor(
    values: object
  ) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}
