import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupUpdateWithoutGradeInput } from "../inputs/GroupUpdateWithoutGradeInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupUpdateWithWhereUniqueWithoutGradeInput", {
  isAbstract: true
})
export class GroupUpdateWithWhereUniqueWithoutGradeInput {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupUpdateWithoutGradeInput, {
    nullable: false
  })
  data!: GroupUpdateWithoutGradeInput;
}
