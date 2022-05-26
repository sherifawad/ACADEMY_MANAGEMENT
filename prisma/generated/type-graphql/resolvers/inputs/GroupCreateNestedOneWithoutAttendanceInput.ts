import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateOrConnectWithoutAttendanceInput } from "../inputs/GroupCreateOrConnectWithoutAttendanceInput";
import { GroupCreateWithoutAttendanceInput } from "../inputs/GroupCreateWithoutAttendanceInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupCreateNestedOneWithoutAttendanceInput", {
  isAbstract: true
})
export class GroupCreateNestedOneWithoutAttendanceInput {
  @TypeGraphQL.Field(_type => GroupCreateWithoutAttendanceInput, {
    nullable: true
  })
  create?: GroupCreateWithoutAttendanceInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateOrConnectWithoutAttendanceInput, {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutAttendanceInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  connect?: GroupWhereUniqueInput | undefined;
}
