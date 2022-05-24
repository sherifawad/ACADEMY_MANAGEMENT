import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamCreateManyProfileInputEnvelope } from "../inputs/ExamCreateManyProfileInputEnvelope";
import { ExamCreateOrConnectWithoutProfileInput } from "../inputs/ExamCreateOrConnectWithoutProfileInput";
import { ExamCreateWithoutProfileInput } from "../inputs/ExamCreateWithoutProfileInput";
import { ExamWhereUniqueInput } from "../inputs/ExamWhereUniqueInput";

@TypeGraphQL.InputType("ExamCreateNestedManyWithoutProfileInput", {
  isAbstract: true
})
export class ExamCreateNestedManyWithoutProfileInput {
  @TypeGraphQL.Field(_type => [ExamCreateWithoutProfileInput], {
    nullable: true
  })
  create?: ExamCreateWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamCreateOrConnectWithoutProfileInput], {
    nullable: true
  })
  connectOrCreate?: ExamCreateOrConnectWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => ExamCreateManyProfileInputEnvelope, {
    nullable: true
  })
  createMany?: ExamCreateManyProfileInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ExamWhereUniqueInput], {
    nullable: true
  })
  connect?: ExamWhereUniqueInput[] | undefined;
}
