import Project from './Project';

export default interface Stage {

    id: number;
    stageName: string;
    projectId: number;
    result: string;
    description: string;
    stageNumber: number;
}