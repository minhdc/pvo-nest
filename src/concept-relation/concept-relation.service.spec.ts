import { Test, TestingModule } from '@nestjs/testing';
import { ConceptRelationService } from './concept-relation.service';

describe('ConceptRelationService', () => {
  let service: ConceptRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptRelationService],
    }).compile();

    service = module.get<ConceptRelationService>(ConceptRelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
