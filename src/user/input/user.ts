import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field((type) => String)
  name: number;

  @Field((type) => String)
  email: string;
}
