/**
 * Класс контактного лица.
 */
export default interface Contact {

  /**
   * Все поля являются отображением получаемой с бэкенда модели класса Contact.
   */
  contactPersonId: number;
  contactName: string;
  companyId: number;
  position: string;
  makeDecision: boolean;
  mainEmail: string;
  otherEmails: string[];
  notes: string[];
  creatorId: number;
  lastUpdaterId: number;
  mainPhone: number;
	otherPhones: string[];
}