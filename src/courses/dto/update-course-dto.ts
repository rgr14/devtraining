import { PartialType } from "@nestjs/mapped-types";
import { createCourseDto } from "./courses-dto";

export class updateCourseDto extends PartialType(createCourseDto){}