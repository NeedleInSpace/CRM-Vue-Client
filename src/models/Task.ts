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
  endDate: Date;
  endTime: Date;
  taskResult: string;
}