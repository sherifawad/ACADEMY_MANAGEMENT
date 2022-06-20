import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamScalarWhereInput } from "../inputs/ExamScalarWhereInput";
import { ExamUpdateManyMutationInput } from "../inputs/ExamUpdateManyMutationInput";

@TypeGraphQL.InputType("ExamUpdateManyWithWhereWithoutProfileInput", {
  isAbstract: true
})
export class ExamUpdateManyWithWhereWithoutProfileInput {
  @TypeGraphQL.Field(_type => ExamScalarWhereInput, {
    nullable: false
  })
  where!: ExamScalarWhereInput;

  @TypeGraphQL.Field(_type => ExamUpdateManyMutationInput, {
    nullable: false
  })
  data!: ExamUpdateManyMutationInput;
}
