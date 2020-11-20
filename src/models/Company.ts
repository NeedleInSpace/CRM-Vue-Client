/**
 * Класс компании.
 */
export default interface Company {

  /**
   * Все поля являются отображением получаемой с бэкенда модели класса Company.
   */
  companyId: number;
  name: string;
  fullName: number;
  kindOfActivity: string;
  consumptionVolume: number;
  generatingCapacity: boolean;
  inn: number;
  kpp: number;
  okpo: number;
  email: string;
  phone: number;
  creatorId: number;
  changerId: number;
  notes: string[];
}