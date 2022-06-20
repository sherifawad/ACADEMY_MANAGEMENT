import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceUpdateInput } from "../../../inputs/AttendanceUpdateInput";
import { AttendanceWhereUniqueInput } from "../../../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceUpdateInput, {
    nullable: false
  })
  data!: AttendanceUpdateInput;

  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;
}
