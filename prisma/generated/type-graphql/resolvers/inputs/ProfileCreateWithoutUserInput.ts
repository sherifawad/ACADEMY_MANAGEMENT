import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateNestedManyWithoutProfileInput } from "../inputs/AttendanceCreateNestedManyWithoutProfileInput";
import { ExamCreateNestedManyWithoutProfileInput } from "../inputs/ExamCreateNestedManyWithoutProfileInput";
import { GroupCreateNestedOneWithoutProfilesInput } from "../inputs/GroupCreateNestedOneWithoutProfilesInput";

@TypeGraphQL.InputType("ProfileCreateWithoutUserInput", {
  isAbstract: true
})
export class ProfileCreateWithoutUserInput {
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

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  createdBy!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  updatedBy?: string | undefined;

  @TypeGraphQL.Field(_type => ExamCreateNestedManyWithoutProfileInput, {
    nullable: true
  })
  exams?: ExamCreateNestedManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateNestedManyWithoutProfileInput, {
    nullable: true
  })
  attendances?: AttendanceCreateNestedManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateNestedOneWithoutProfilesInput, {
    nullable: false
  })
  group!: GroupCreateNestedOneWithoutProfilesInput;
}
