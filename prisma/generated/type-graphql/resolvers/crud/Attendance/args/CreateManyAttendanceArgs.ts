import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceCreateManyInput } from "../../../inputs/AttendanceCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyAttendanceArgs {
  @TypeGraphQL.Field(_type => [AttendanceCreateManyInput], {
    nullable: false
  })
  data!: AttendanceCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
