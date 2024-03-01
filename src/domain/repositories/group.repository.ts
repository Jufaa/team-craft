import { CreateProjectDTO } from '../dtos';
import { UpdateProjectDTO } from '../dtos/projects/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';

export abstract class GroupRepository {
  abstract Create(data: CreateProjectDTO): Promise<ProjectEntity | null>;
  abstract Get(id: string): Promise<ProjectEntity[] | null>;
  abstract GetById(userId: string, projectId: string): Promise<ProjectEntity | null>;
  abstract Update(
    userId: string,
    projectId: string,
    data: UpdateProjectDTO
  ): Promise<ProjectEntity | null>;
  abstract Delete(userId: string, projectId: string): Promise<ProjectEntity | null>;
}
