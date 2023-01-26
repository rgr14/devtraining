import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createCourseDto } from './dto/courses-dto';
import { updateCourseDto } from './dto/update-course-dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';


@Injectable()
export class CoursesService {
    @Inject('COURSES_REPOSITORY')
    private courseRepository: Repository<Course>;

    @Inject('TAGS_REPOSITORY')
    private tagsRepository: Repository<Tag>;

    async findAll(){
        return this.courseRepository.find({
            relations: ['tags'],
        });
    }

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({
            where: {id: id},
            relations: ['tags'],
        });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }
        return course;
    }

    async create(createCourseDto: createCourseDto) {
        const tags = await Promise.all(
          createCourseDto.tags.map((name) => this.preloadTagByName(name)),
        );
    
        const course = this.courseRepository.create({
          ...createCourseDto,
          tags,
        });
        return this.courseRepository.save(course);
      }
    
      async update(id: number, updateCourseDto: updateCourseDto) {
        const tags =
          updateCourseDto.tags &&
          (await Promise.all(
            updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
          ));
    
        const course = await this.courseRepository.preload({
          id,
          ...updateCourseDto,
          tags,
        });
    
        if (!course) {
          throw new NotFoundException(`Course ID ${id} not found`);
        }
    
        return this.courseRepository.save(course);
      }

    async remove(id: number) {
        const course = await this.courseRepository.findOne({where: {id: id}});

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.delete(id);
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagsRepository.findOne({ where: { name } });
    
        if (tag) {
          return tag;
        }
    
        return this.tagsRepository.create({ name });
    }
}
