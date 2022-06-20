import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateManyGroupInputEnvelope } from "../inputs/AttendanceCreateManyGroupInputEnvelope";
import { AttendanceCreateOrConnectWithoutGroupInput } from "../inputs/AttendanceCreateOrConnectWithoutGroupInput";
import { AttendanceCreateWithoutGroupInput } from "../inputs/AttendanceCreateWithoutGroupInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceCreateNestedManyWithoutGroupInput", {
  isAbstract: true
})
export class AttendanceCreateNestedManyWithoutGroupInput {
  @TypeGraphQL.Field(_type => [AttendanceCreateWithoutGroupInput], {
    nullable: true
  })
  create?: AttendanceCreateWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceCreateOrConnectWithoutGroupInput], {
    nullable: true
  })
  connectOrCreate?: AttendanceCreateOrConnectWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateManyGroupInputEnvelope, {
    nullable: true
  })
  createMany?: AttendanceCreateManyGroupInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereUniqueInput], {
    nullable: true
  })
  connect?: AttendanceWhereUniqueInput[] | undefined;
}
