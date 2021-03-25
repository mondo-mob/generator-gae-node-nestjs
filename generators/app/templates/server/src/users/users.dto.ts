import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

enum UserRole {
  super = 'super',
  admin = 'admin',
  user = 'user',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  name?: string;
  @Field()
  email: string;
  @Field()
  enabled: boolean;
  @Field()
  invited: boolean;
  @Field(() => [UserRole!])
  roles: UserRole[];
}
