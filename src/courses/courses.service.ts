import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { createCourseDto } from './dto/courses-dto';
import { updateCourseDto } from './dto/update-course-dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    findAll(){
        return this.courseRepository.find();
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne({where: {id: +id}});

        if(!course) {
            throw new HttpException(`Course ID ${id} not found`, 404);
        }
        return course;
    }

    create(createCourseDto: createCourseDto) {
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: updateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
        });

        if(!course) {
            throw new HttpException(`Course ID ${id} not found`, 404);
        }

        return this.courseRepository.save(course);
        
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({where: {id: +id}});
        return this.courseRepository.delete(id);
    }
}
