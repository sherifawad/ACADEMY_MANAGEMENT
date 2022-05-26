import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateNestedManyWithoutProfileInput } from "../inputs/AttendanceCreateNestedManyWithoutProfileInput";
import { ExamCreateNestedManyWithoutProfileInput } from "../inputs/ExamCreateNestedManyWithoutProfileInput";
import { UserCreateNestedOneWithoutProfileInput } from "../inputs/UserCreateNestedOneWithoutProfileInput";

@TypeGraphQL.InputType("ProfileCreateWithoutGroupInput", {
  isAbstract: true
})
export class ProfileCreateWithoutGroupInput {
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

  @TypeGraphQL.Field(_type => AttendanceCreateNestedManyWithoutProfileInput, {
    nullable: true
  })
  attendances?: AttendanceCreateNestedManyWithoutProfileInput | undefined;
}
