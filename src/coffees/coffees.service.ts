import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  readAll() {
    return this.coffees;
  }

  read(id: string) {
    const coffee: Coffee = this.findCoffee(id);

    if (!coffee) {
      throw new NotFoundException(`Coffee id ${id} not found`);
    }

    return coffee;
  }

  create(createCoffeDto: CreateCoffeeDto) {
    const id = this.coffees[this.coffees.length - 1].id + 1;
    return [...this.coffees, { id, ...createCoffeDto }];
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee: Coffee = this.findCoffee(id);
    return { id: coffee.id, ...updateCoffeeDto };
  }

  delete(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }

    return this.coffees;
  }

  private findCoffee(id: string) {
    return this.coffees.find((coffee) => coffee.id === +id);
  }
}
