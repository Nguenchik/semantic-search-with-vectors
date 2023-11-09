import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  createDocument(@Body() content: string) {
    return this.documentService.createDocument(content);
  }

  @Get('search')
  findSimilarDocuments(@Query('query') query: string) {
    return this.documentService.findSimilarDocuments(query);
  }
}
