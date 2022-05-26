import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceCreateInput } from "../../../inputs/AttendanceCreateInput";
import { AttendanceUpdateInput } from "../../../inputs/AttendanceUpdateInput";
import { AttendanceWhereUniqueInput } from "../../../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceCreateInput, {
    nullable: false
  })
  create!: AttendanceCreateInput;

  @TypeGraphQL.Field(_type => AttendanceUpdateInput, {
    nullable: false
  })
  update!: AttendanceUpdateInput;
}
