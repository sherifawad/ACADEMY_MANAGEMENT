import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateWithoutGradeInput } from "../inputs/GroupCreateWithoutGradeInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupCreateOrConnectWithoutGradeInput", {
  isAbstract: true
})
export class GroupCreateOrConnectWithoutGradeInput {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutGradeInput, {
    nullable: false
  })
  create!: GroupCreateWithoutGradeInput;
}
