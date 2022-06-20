import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateManyProfileInputEnvelope } from "../inputs/AttendanceCreateManyProfileInputEnvelope";
import { AttendanceCreateOrConnectWithoutProfileInput } from "../inputs/AttendanceCreateOrConnectWithoutProfileInput";
import { AttendanceCreateWithoutProfileInput } from "../inputs/AttendanceCreateWithoutProfileInput";
import { AttendanceScalarWhereInput } from "../inputs/AttendanceScalarWhereInput";
import { AttendanceUpdateManyWithWhereWithoutProfileInput } from "../inputs/AttendanceUpdateManyWithWhereWithoutProfileInput";
import { AttendanceUpdateWithWhereUniqueWithoutProfileInput } from "../inputs/AttendanceUpdateWithWhereUniqueWithoutProfileInput";
import { AttendanceUpsertWithWhereUniqueWithoutProfileInput } from "../inputs/AttendanceUpsertWithWhereUniqueWithoutProfileInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceUpdateManyWithoutProfileInput", {
  isAbstract: true
})
export class AttendanceUpdateManyWithoutProfileInput {
  @TypeGraphQL.Field(_type => [AttendanceCreateWithoutProfileInput], {
    nullable: true
  })
  create?: AttendanceCreateWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceCreateOrConnectWithoutProfileInput], {
    nullable: true
  })
  connectOrCreate?: AttendanceCreateOrConnectWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceUpsertWithWhereUniqueWithoutProfileInput], {
    nullable: true
  })
  upsert?: AttendanceUpsertWithWhereUniqueWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateManyProfileInputEnvelope, {
    nullable: true
  })
  createMany?: AttendanceCreateManyProfileInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereUniqueInput], {
    nullable: true
  })
  set?: AttendanceWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereUniqueInput], {
    nullable: true
  })
  disconnect?: AttendanceWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereUniqueInput], {
    nullable: true
  })
  delete?: AttendanceWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereUniqueInput], {
    nullable: true
  })
  connect?: AttendanceWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceUpdateWithWhereUniqueWithoutProfileInput], {
    nullable: true
  })
  update?: AttendanceUpdateWithWhereUniqueWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceUpdateManyWithWhereWithoutProfileInput], {
    nullable: true
  })
  updateMany?: AttendanceUpdateManyWithWhereWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarWhereInput], {
    nullable: true
  })
  deleteMany?: AttendanceScalarWhereInput[] | undefined;
}
