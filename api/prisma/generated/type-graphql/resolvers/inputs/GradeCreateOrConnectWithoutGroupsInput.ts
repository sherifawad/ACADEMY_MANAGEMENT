import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeCreateWithoutGroupsInput } from "../inputs/GradeCreateWithoutGroupsInput";
import { GradeWhereUniqueInput } from "../inputs/GradeWhereUniqueInput";

@TypeGraphQL.InputType("GradeCreateOrConnectWithoutGroupsInput", {
  isAbstract: true
})
export class GradeCreateOrConnectWithoutGroupsInput {
  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: false
  })
  where!: GradeWhereUniqueInput;

  @TypeGraphQL.Field(_type => GradeCreateWithoutGroupsInput, {
    nullable: false
  })
  create!: GradeCreateWithoutGroupsInput;
}
