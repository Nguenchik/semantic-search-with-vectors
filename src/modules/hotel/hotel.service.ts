import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import * as fasttext from 'fasttext.js';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async createHotel(hotelData: Partial<Hotel>): Promise<Hotel> {
    const hotel = this.hotelRepository.create(hotelData);
    return this.hotelRepository.save(hotel);
  }

  async findHotelsByQuery(query: string): Promise<Hotel[]> {
    const queryVector = await fasttext.getWordVector(query);

    const similarHotels = await this.hotelRepository
      .createQueryBuilder('hotel')
      .getMany();

    const relevantHotels = similarHotels.filter((hotel) => {
      const hotelVector = hotel.vector;
      const similarity = fasttext.cosineSimilarity(queryVector, hotelVector);
      return similarity > 0.8;
    });

    return relevantHotels;
  }

  async findHotelsByQueryQuick(query: string): Promise<Hotel[]> {
    const queryVector = await fasttext.getWordVector(query);

    const relevantHotels = await this.hotelRepository.query(
      'SELECT * FROM hotel WHERE pg_similarity(vector, $1) > 0.8',
      [queryVector],
    );

    return relevantHotels;
  }
}
