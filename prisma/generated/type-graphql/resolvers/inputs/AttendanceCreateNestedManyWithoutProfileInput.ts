import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateManyProfileInputEnvelope } from "../inputs/AttendanceCreateManyProfileInputEnvelope";
import { AttendanceCreateOrConnectWithoutProfileInput } from "../inputs/AttendanceCreateOrConnectWithoutProfileInput";
import { AttendanceCreateWithoutProfileInput } from "../inputs/AttendanceCreateWithoutProfileInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceCreateNestedManyWithoutProfileInput", {
  isAbstract: true
})
export class AttendanceCreateNestedManyWithoutProfileInput {
  @TypeGraphQL.Field(_type => [AttendanceCreateWithoutProfileInput], {
    nullable: true
  })
  create?: AttendanceCreateWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceCreateOrConnectWithoutProfileInput], {
    nullable: true
  })
  connectOrCreate?: AttendanceCreateOrConnectWithoutProfileInput[] | undefined;

  @TypeGraphQL.Field(_type => AttendanceCreateManyProfileInputEnvelope, {
    nullable: true
  })
  createMany?: AttendanceCreateManyProfileInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereUniqueInput], {
    nullable: true
  })
  connect?: AttendanceWhereUniqueInput[] | undefined;
}
