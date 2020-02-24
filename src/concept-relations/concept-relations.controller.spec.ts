import { Test, TestingModule } from '@nestjs/testing';
import { ConceptRelationsController } from './concept-relations.controller';

describe('ConceptRelations Controller', () => {
  let controller: ConceptRelationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptRelationsController],
    }).compile();

    controller = module.get<ConceptRelationsController>(ConceptRelationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
