import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateProjectCollectionDto } from './dtos/create-collection.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import {
  ProjectCollection,
  ProjectCollectionDocument,
} from './schemas/projectCollection.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(ProjectCollection.name)
    private readonly projectCollectionModel: Model<ProjectCollectionDocument>,
  ) {}

  async findAllProjects() {
    return await this.projectModel.find();
  }
  async createProject(projectDto: CreateProjectDto, userId: string) {
    return await this.projectModel.create({ ...projectDto, createdBy: userId });
  }

  async findAllCollections() {
    return await this.projectCollectionModel.find();
  }

  async createProjectCollection(
    projectCollectionDto: CreateProjectCollectionDto,
    userId: string,
  ) {
    console.log(projectCollectionDto);
    return await this.projectCollectionModel.create({
      ...projectCollectionDto,
      createdBy: userId,
    });
  }

  async updateProjectColletion(
    userId: string,
    collectionId: string,
    attrs: Partial<ProjectCollection>,
  ) {
    const collection = await this.projectCollectionModel.findById(collectionId);
    if (collection.createdBy.toString() !== userId) {
      throw new NotAcceptableException('its not your collection');
    }
    return await this.projectCollectionModel.findByIdAndUpdate(
      collectionId,
      attrs,
    );
  }

  async deleteProjectCollection(userId: string, collectionId: string) {
    const collection = await this.projectCollectionModel.findById(collectionId);
    if (collection.createdBy.toString() !== userId) {
      throw new NotAcceptableException('its not your collection');
    }
    return await this.projectCollectionModel.findByIdAndDelete(collectionId);
  }
}
