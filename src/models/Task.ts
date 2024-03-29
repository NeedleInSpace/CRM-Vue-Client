export default interface Task {

  taskId: number;
  taskName: string;
  taskProjectId: number;
  taskStageId: number;
  taskCompanyId: number;
  contactId: number;
  taskDate: Date;
  taskTime: string;
  taskPlace: string;
  taskDescription: string;
  taskStatusId: number;
  employeeId: number;
  creatorId: number;
  endDate: Date;
  endTime: Date;
  result: string;
  isAssignment: boolean;
  comment: string;
}