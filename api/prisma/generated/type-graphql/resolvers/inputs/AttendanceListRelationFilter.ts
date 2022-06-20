import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceWhereInput } from "../inputs/AttendanceWhereInput";

@TypeGraphQL.InputType("AttendanceListRelationFilter", {
  isAbstract: true
})
export class AttendanceListRelationFilter {
  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  every?: AttendanceWhereInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  some?: AttendanceWhereInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  none?: AttendanceWhereInput | undefined;
}
