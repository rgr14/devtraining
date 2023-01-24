import { HttpException, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'Fundamentos do NestJS',
            description: 'Description for course #1',
            tags: ['node.js', 'nestjs', 'javascript']
        }
    ];

    findAll(): Course[] {
        return this.courses;
    }

    findOne(id: string) {
        const course = this.courses.find(course => course.id === +id);
        if(!course) {
            throw new HttpException(`Course ID ${id} not found`, 404);
        }
        return course;
    }

    create(createCourseDto: any) {
        this.courses.push(createCourseDto);
    }

    update(id: string, updateCourseDto: any) {
        const index = this.courses.findIndex(course => course.id === +id);
        this.courses[index] = updateCourseDto;
    }

    remove(id: string) {
        const indexCourse = this.courses.findIndex(course => course.id === +id);
        if(indexCourse >= 0) {
            this.courses.splice(indexCourse, 1);
        }        
    }
}
