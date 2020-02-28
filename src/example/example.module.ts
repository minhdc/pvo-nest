import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Example } from './example.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Example.modelName, schema:Example.schema}
    ])
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
  exports:[ExampleService]
  
})
export class ExampleModule {}
