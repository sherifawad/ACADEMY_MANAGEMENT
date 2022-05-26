import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceUpdateManyMutationInput } from "../../../inputs/AttendanceUpdateManyMutationInput";
import { AttendanceWhereInput } from "../../../inputs/AttendanceWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceUpdateManyMutationInput, {
    nullable: false
  })
  data!: AttendanceUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  where?: AttendanceWhereInput | undefined;
}
