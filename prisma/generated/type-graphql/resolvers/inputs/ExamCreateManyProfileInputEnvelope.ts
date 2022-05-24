import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamCreateManyProfileInput } from "../inputs/ExamCreateManyProfileInput";

@TypeGraphQL.InputType("ExamCreateManyProfileInputEnvelope", {
  isAbstract: true
})
export class ExamCreateManyProfileInputEnvelope {
  @TypeGraphQL.Field(_type => [ExamCreateManyProfileInput], {
    nullable: false
  })
  data!: ExamCreateManyProfileInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
