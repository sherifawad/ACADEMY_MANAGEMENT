import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeCreateWithoutGroupsInput } from "../inputs/GradeCreateWithoutGroupsInput";
import { GradeUpdateWithoutGroupsInput } from "../inputs/GradeUpdateWithoutGroupsInput";

@TypeGraphQL.InputType("GradeUpsertWithoutGroupsInput", {
  isAbstract: true
})
export class GradeUpsertWithoutGroupsInput {
  @TypeGraphQL.Field(_type => GradeUpdateWithoutGroupsInput, {
    nullable: false
  })
  update!: GradeUpdateWithoutGroupsInput;

  @TypeGraphQL.Field(_type => GradeCreateWithoutGroupsInput, {
    nullable: false
  })
  create!: GradeCreateWithoutGroupsInput;
}
