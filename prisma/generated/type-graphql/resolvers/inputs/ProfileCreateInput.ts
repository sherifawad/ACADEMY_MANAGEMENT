import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamCreateNestedManyWithoutProfileInput } from "../inputs/ExamCreateNestedManyWithoutProfileInput";
import { GroupCreateNestedOneWithoutProfilesInput } from "../inputs/GroupCreateNestedOneWithoutProfilesInput";
import { UserCreateNestedOneWithoutProfileInput } from "../inputs/UserCreateNestedOneWithoutProfileInput";

@TypeGraphQL.InputType("ProfileCreateInput", {
  isAbstract: true
})
export class ProfileCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  bio?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutProfileInput, {
    nullable: false
  })
  user!: UserCreateNestedOneWithoutProfileInput;

  @TypeGraphQL.Field(_type => ExamCreateNestedManyWithoutProfileInput, {
    nullable: true
  })
  exams?: ExamCreateNestedManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateNestedOneWithoutProfilesInput, {
    nullable: false
  })
  group!: GroupCreateNestedOneWithoutProfilesInput;
}
