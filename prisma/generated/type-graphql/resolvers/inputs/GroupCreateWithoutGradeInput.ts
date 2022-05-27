import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateNestedManyWithoutGroupInput } from "../inputs/AttendanceCreateNestedManyWithoutGroupInput";
import { ProfileCreateNestedManyWithoutGroupInput } from "../inputs/ProfileCreateNestedManyWithoutGroupInput";

@TypeGraphQL.InputType("GroupCreateWithoutGradeInput", {
  isAbstract: true
})
export class GroupCreateWithoutGradeInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

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

  @TypeGraphQL.Field(_type => ProfileCreateNestedManyWithoutGroupInput, {
    nullable: true
  })
  profiles?: ProfileCreateNestedManyWithoutGroupInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateNestedManyWithoutGroupInput, {
    nullable: true
  })
  attendance?: AttendanceCreateNestedManyWithoutGroupInput | undefined;
}
