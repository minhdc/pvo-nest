import { Test, TestingModule } from '@nestjs/testing';
import { ConceptRelationsService } from './concept-relations.service';

describe('ConceptRelationsService', () => {
  let service: ConceptRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptRelationsService],
    }).compile();

    service = module.get<ConceptRelationsService>(ConceptRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
