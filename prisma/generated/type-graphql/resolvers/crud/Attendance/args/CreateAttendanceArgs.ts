import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceCreateInput } from "../../../inputs/AttendanceCreateInput";

@TypeGraphQL.ArgsType()
export class CreateAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceCreateInput, {
    nullable: false
  })
  data!: AttendanceCreateInput;
}
