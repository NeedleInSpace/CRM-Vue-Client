export default class DateConverter {
  static fasttimeToDate(fasttime: string): string {
    if (fasttime.toString().length === 13) {
      const fullDate = new Date(fasttime);

      const day = fullDate.getDate();
      const month = fullDate.getMonth();
      const year = fullDate.getFullYear();

      return new Date(year, month, day).toISOString().split('T')[0];
    }
    return fasttime;
  }

  static dateToDdMm(date: Date): string {
    const isoString = date.toISOString().split('T')[0];

    let str = isoString.substring(8, 10);
    str += '.';
    str += isoString.substring(5, 7);

    return str;
  }
}
