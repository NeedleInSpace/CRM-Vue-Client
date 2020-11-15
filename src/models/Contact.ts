export default interface Contact {

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