import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => String)
  name: number;

  @Field(() => String)
  email: string;
}
