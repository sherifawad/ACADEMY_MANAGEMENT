import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamCreateManyProfileInputEnvelope } from "../inputs/ExamCreateManyProfileInputEnvelope";
import { ExamCreateOrConnectWithoutProfileInput } from "../inputs/ExamCreateOrConnectWithoutProfileInput";
import { ExamCreateWithoutProfileInput } from "../inputs/ExamCreateWithoutProfileInput";
import { ExamScalarWhereInput } from "../inputs/ExamScalarWhereInput";
import { ExamUpdateManyWithWhereWithoutProfileInput } from "../inputs/ExamUpdateManyWithWhereWithoutProfileInput";
import { ExamUpdateWithWhereUniqueWithoutProfileInput } from "../inputs/ExamUpdateWithWhereUniqueWithoutProfileInput";
import { ExamUpsertWithWhereUniqueWithoutProfileInput } from "../inputs/ExamUpsertWithWhereUniqueWithoutProfileInput";
import { ExamWhereUniqueInput } from "../inputs/ExamWhereUniqueInput";

@TypeGraphQL.InputType("ExamUpdateManyWithoutProfileInput", {
  isAbstract: true
})
export class ExamUpdateManyWithoutProfileInput {
  @TypeGraphQL.Field(_type => [ExamCreateWithoutProfileInput], {
    nullable: true
  })
  create?: ExamCreateWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamCreateOrConnectWithoutProfileInput], {
    nullable: true
  })
  connectOrCreate?: ExamCreateOrConnectWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamUpsertWithWhereUniqueWithoutProfileInput], {
    nullable: true
  })
  upsert?: ExamUpsertWithWhereUniqueWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => ExamCreateManyProfileInputEnvelope, {
    nullable: true
  })
  createMany?: ExamCreateManyProfileInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ExamWhereUniqueInput], {
    nullable: true
  })
  set?: ExamWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ExamWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamWhereUniqueInput], {
    nullable: true
  })
  delete?: ExamWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamWhereUniqueInput], {
    nullable: true
  })
  connect?: ExamWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamUpdateWithWhereUniqueWithoutProfileInput], {
    nullable: true
  })
  update?: ExamUpdateWithWhereUniqueWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamUpdateManyWithWhereWithoutProfileInput], {
    nullable: true
  })
  updateMany?: ExamUpdateManyWithWhereWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ExamScalarWhereInput[] | undefined;
}
