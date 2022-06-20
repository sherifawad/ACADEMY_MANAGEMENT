import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamUpdateWithoutProfileInput } from "../inputs/ExamUpdateWithoutProfileInput";
import { ExamWhereUniqueInput } from "../inputs/ExamWhereUniqueInput";

@TypeGraphQL.InputType("ExamUpdateWithWhereUniqueWithoutProfileInput", {
  isAbstract: true
})
export class ExamUpdateWithWhereUniqueWithoutProfileInput {
  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: false
  })
  where!: ExamWhereUniqueInput;

  @TypeGraphQL.Field(_type => ExamUpdateWithoutProfileInput, {
    nullable: false
  })
  data!: ExamUpdateWithoutProfileInput;
}
