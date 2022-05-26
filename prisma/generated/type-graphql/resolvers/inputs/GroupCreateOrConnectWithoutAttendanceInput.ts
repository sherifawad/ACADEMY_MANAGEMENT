import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateWithoutAttendanceInput } from "../inputs/GroupCreateWithoutAttendanceInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupCreateOrConnectWithoutAttendanceInput", {
  isAbstract: true
})
export class GroupCreateOrConnectWithoutAttendanceInput {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutAttendanceInput, {
    nullable: false
  })
  create!: GroupCreateWithoutAttendanceInput;
}
