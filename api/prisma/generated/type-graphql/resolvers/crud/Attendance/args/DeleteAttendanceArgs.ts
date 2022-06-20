import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceWhereUniqueInput } from "../../../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;
}
