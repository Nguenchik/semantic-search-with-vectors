import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  createHotel(@Body() hotelData: Partial<Hotel>) {
    return this.hotelService.createHotel(hotelData);
  }

  @Get('search')
  findHotelsByQuery(@Query('query') query: string) {
    return this.hotelService.findHotelsByQuery(query);
  }
}
