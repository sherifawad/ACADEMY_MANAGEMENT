import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceWhereInput } from "../../../inputs/AttendanceWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  where?: AttendanceWhereInput | undefined;
}
