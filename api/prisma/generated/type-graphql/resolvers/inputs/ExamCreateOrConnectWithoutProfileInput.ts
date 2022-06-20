import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamCreateWithoutProfileInput } from "../inputs/ExamCreateWithoutProfileInput";
import { ExamWhereUniqueInput } from "../inputs/ExamWhereUniqueInput";

@TypeGraphQL.InputType("ExamCreateOrConnectWithoutProfileInput", {
  isAbstract: true
})
export class ExamCreateOrConnectWithoutProfileInput {
  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: false
  })
  where!: ExamWhereUniqueInput;

  @TypeGraphQL.Field(_type => ExamCreateWithoutProfileInput, {
    nullable: false
  })
  create!: ExamCreateWithoutProfileInput;
}
