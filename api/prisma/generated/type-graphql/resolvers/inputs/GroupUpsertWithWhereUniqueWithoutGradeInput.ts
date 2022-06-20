import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateWithoutGradeInput } from "../inputs/GroupCreateWithoutGradeInput";
import { GroupUpdateWithoutGradeInput } from "../inputs/GroupUpdateWithoutGradeInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupUpsertWithWhereUniqueWithoutGradeInput", {
  isAbstract: true
})
export class GroupUpsertWithWhereUniqueWithoutGradeInput {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupUpdateWithoutGradeInput, {
    nullable: false
  })
  update!: GroupUpdateWithoutGradeInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutGradeInput, {
    nullable: false
  })
  create!: GroupCreateWithoutGradeInput;
}
