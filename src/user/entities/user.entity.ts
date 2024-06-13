// src/user/user.entity.ts
import { ObjectType, Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class User {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  password: string;
}

@ObjectType({ implements: User })
export class UserWithEmail extends User {
  @Field()
  email: string;
}

@ObjectType({ implements: User })
export class UserWithPhone extends User {
  @Field()
  phone: string;
}
