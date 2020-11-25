import Project from './Project';

export default interface Stage {

    id: number;
    stageName: string;
    projectId: Project;
    result: string;
    description: number;
    stageNumber: number;
}