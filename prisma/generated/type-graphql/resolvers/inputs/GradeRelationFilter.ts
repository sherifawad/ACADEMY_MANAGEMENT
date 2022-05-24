import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeWhereInput } from "../inputs/GradeWhereInput";

@TypeGraphQL.InputType("GradeRelationFilter", {
  isAbstract: true
})
export class GradeRelationFilter {
  @TypeGraphQL.Field(_type => GradeWhereInput, {
    nullable: true
  })
  is?: GradeWhereInput | undefined;

  @TypeGraphQL.Field(_type => GradeWhereInput, {
    nullable: true
  })
  isNot?: GradeWhereInput | undefined;
}
