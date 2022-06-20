import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateManyGroupInputEnvelope } from "../inputs/AttendanceCreateManyGroupInputEnvelope";
import { AttendanceCreateOrConnectWithoutGroupInput } from "../inputs/AttendanceCreateOrConnectWithoutGroupInput";
import { AttendanceCreateWithoutGroupInput } from "../inputs/AttendanceCreateWithoutGroupInput";
import { AttendanceScalarWhereInput } from "../inputs/AttendanceScalarWhereInput";
import { AttendanceUpdateManyWithWhereWithoutGroupInput } from "../inputs/AttendanceUpdateManyWithWhereWithoutGroupInput";
import { AttendanceUpdateWithWhereUniqueWithoutGroupInput } from "../inputs/AttendanceUpdateWithWhereUniqueWithoutGroupInput";
import { AttendanceUpsertWithWhereUniqueWithoutGroupInput } from "../inputs/AttendanceUpsertWithWhereUniqueWithoutGroupInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceUpdateManyWithoutGroupInput", {
  isAbstract: true
})
export class AttendanceUpdateManyWithoutGroupInput {
  @TypeGraphQL.Field(_type => [AttendanceCreateWithoutGroupInput], {
    nullable: true
  })
  create?: AttendanceCreateWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceCreateOrConnectWithoutGroupInput], {
    nullable: true
  })
  connectOrCreate?: AttendanceCreateOrConnectWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceUpsertWithWhereUniqueWithoutGroupInput], {
    nullable: true
  })
  upsert?: AttendanceUpsertWithWhereUniqueWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateManyGroupInputEnvelope, {
    nullable: true
  })
  createMany?: AttendanceCreateManyGroupInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [AttendanceUpdateWithWhereUniqueWithoutGroupInput], {
    nullable: true
  })
  update?: AttendanceUpdateWithWhereUniqueWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceUpdateManyWithWhereWithoutGroupInput], {
    nullable: true
  })
  updateMany?: AttendanceUpdateManyWithWhereWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarWhereInput], {
    nullable: true
  })
  deleteMany?: AttendanceScalarWhereInput[] | undefined;
}
