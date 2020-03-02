import { Test, TestingModule } from '@nestjs/testing';
import { ConceptRelationController } from './concept-relation.controller';

describe('ConceptRelation Controller', () => {
  let controller: ConceptRelationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptRelationController],
    }).compile();

    controller = module.get<ConceptRelationController>(ConceptRelationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
