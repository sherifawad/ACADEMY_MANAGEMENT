import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamWhereInput } from "../inputs/ExamWhereInput";

@TypeGraphQL.InputType("ExamListRelationFilter", {
  isAbstract: true
})
export class ExamListRelationFilter {
  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  every?: ExamWhereInput | undefined;

  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  some?: ExamWhereInput | undefined;

  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  none?: ExamWhereInput | undefined;
}
