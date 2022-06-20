import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamCreateWithoutProfileInput } from "../inputs/ExamCreateWithoutProfileInput";
import { ExamUpdateWithoutProfileInput } from "../inputs/ExamUpdateWithoutProfileInput";
import { ExamWhereUniqueInput } from "../inputs/ExamWhereUniqueInput";

@TypeGraphQL.InputType("ExamUpsertWithWhereUniqueWithoutProfileInput", {
  isAbstract: true
})
export class ExamUpsertWithWhereUniqueWithoutProfileInput {
  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: false
  })
  where!: ExamWhereUniqueInput;

  @TypeGraphQL.Field(_type => ExamUpdateWithoutProfileInput, {
    nullable: false
  })
  update!: ExamUpdateWithoutProfileInput;

  @TypeGraphQL.Field(_type => ExamCreateWithoutProfileInput, {
    nullable: false
  })
  create!: ExamCreateWithoutProfileInput;
}
