import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CreateProjectCollectionDto } from './dtos/create-collection.dto';
import { ProjectService } from './project.service';
import { UpdateProjectCollectionDto } from './dtos/update-collection.dto';
import { Role } from 'src/user/schemas/user.schema';
import { RoleGuard } from 'src/auth/role-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(RoleGuard([Role.admin]))
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProjects() {
    return this.projectService.findAllProjects();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@Body() body: CreateProjectDto, @Req() req: any) {
    return this.projectService.createProject(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('collection')
  getAllCollections() {
    return this.projectService.findAllCollections();
  }

  @UseGuards(JwtAuthGuard)
  @Post('collection')
  createCollection(@Body() body: CreateProjectCollectionDto, @Req() req: any) {
    return this.projectService.createProjectCollection(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('collection/:id')
  updateCollection(
    @Body() body: UpdateProjectCollectionDto,
    @Param('id') collectionId: string,
    @Req() req: any,
  ) {
    return this.projectService.updateProjectColletion(
      req.user.id,
      collectionId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('collection/:id')
  deleteCollection(@Param('id') collectionId: string, @Req() req: any) {
    return this.projectService.deleteProjectCollection(
      req.user.id,
      collectionId,
    );
  }
}
