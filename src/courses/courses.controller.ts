import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    findAll(): string {
        return 'This action returns all courses';
    }

    @Get(':id')
    findOne(@Param('id') id): string {
        return `This action returns a #${id} course`;
    }
}
