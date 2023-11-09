import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import * as fasttext from 'fasttext.js';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(content: string): Promise<Document> {
    const vector = await fasttext.getWordVector(content);

    const document = new Document();
    document.content = content;
    document.vector = vector;

    return this.documentRepository.save(document);
  }

  async findSimilarDocuments(query: string): Promise<Document[]> {
    const queryVector = await fasttext.getWordVector(query);

    const similarDocuments = await this.documentRepository
      .createQueryBuilder('document')
      .where('similarity(document.vector, :queryVector) > 0.8', { queryVector })
      .getMany();

    return similarDocuments;
  }
}
