import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateWithoutAttendanceInput } from "../inputs/GroupCreateWithoutAttendanceInput";
import { GroupUpdateWithoutAttendanceInput } from "../inputs/GroupUpdateWithoutAttendanceInput";

@TypeGraphQL.InputType("GroupUpsertWithoutAttendanceInput", {
  isAbstract: true
})
export class GroupUpsertWithoutAttendanceInput {
  @TypeGraphQL.Field(_type => GroupUpdateWithoutAttendanceInput, {
    nullable: false
  })
  update!: GroupUpdateWithoutAttendanceInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutAttendanceInput, {
    nullable: false
  })
  create!: GroupCreateWithoutAttendanceInput;
}
