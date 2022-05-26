import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateWithoutProfileInput } from "../inputs/AttendanceCreateWithoutProfileInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceCreateOrConnectWithoutProfileInput", {
  isAbstract: true
})
export class AttendanceCreateOrConnectWithoutProfileInput {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceCreateWithoutProfileInput, {
    nullable: false
  })
  create!: AttendanceCreateWithoutProfileInput;
}
