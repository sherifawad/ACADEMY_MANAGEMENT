import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateNestedManyWithoutGroupInput } from "../inputs/AttendanceCreateNestedManyWithoutGroupInput";
import { GradeCreateNestedOneWithoutGroupsInput } from "../inputs/GradeCreateNestedOneWithoutGroupsInput";

@TypeGraphQL.InputType("GroupCreateWithoutProfilesInput", {
  isAbstract: true
})
export class GroupCreateWithoutProfilesInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isActive?: boolean | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  startAt?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  endAt?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  createdBy!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  updatedBy?: string | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateNestedManyWithoutGroupInput, {
    nullable: true
  })
  attendance?: AttendanceCreateNestedManyWithoutGroupInput | undefined;

  @TypeGraphQL.Field(_type => GradeCreateNestedOneWithoutGroupsInput, {
    nullable: true
  })
  grade?: GradeCreateNestedOneWithoutGroupsInput | undefined;
}
