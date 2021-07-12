import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeeService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.read(id);
  }

  @Post()
  create(@Body() createCoffeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param(':id') id: string) {
    return this.coffeeService.delete(id);
  }
}
