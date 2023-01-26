import { Controller, Get, Param, Body, Post, Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { createCourseDto } from './dto/courses-dto';
import { updateCourseDto } from './dto/update-course-dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id);
    }

    @Post()
    create(@Body() createCourseDto: createCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateCourseDto: updateCourseDto){
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.coursesService.remove(+id);
    }
}
