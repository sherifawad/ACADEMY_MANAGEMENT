import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeCreateOrConnectWithoutGroupsInput } from "../inputs/GradeCreateOrConnectWithoutGroupsInput";
import { GradeCreateWithoutGroupsInput } from "../inputs/GradeCreateWithoutGroupsInput";
import { GradeWhereUniqueInput } from "../inputs/GradeWhereUniqueInput";

@TypeGraphQL.InputType("GradeCreateNestedOneWithoutGroupsInput", {
  isAbstract: true
})
export class GradeCreateNestedOneWithoutGroupsInput {
  @TypeGraphQL.Field(_type => GradeCreateWithoutGroupsInput, {
    nullable: true
  })
  create?: GradeCreateWithoutGroupsInput | undefined;

  @TypeGraphQL.Field(_type => GradeCreateOrConnectWithoutGroupsInput, {
    nullable: true
  })
  connectOrCreate?: GradeCreateOrConnectWithoutGroupsInput | undefined;

  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: true
  })
  connect?: GradeWhereUniqueInput | undefined;
}
