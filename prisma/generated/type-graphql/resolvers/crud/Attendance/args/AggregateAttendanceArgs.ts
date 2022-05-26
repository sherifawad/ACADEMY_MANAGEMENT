import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceOrderByWithRelationInput } from "../../../inputs/AttendanceOrderByWithRelationInput";
import { AttendanceWhereInput } from "../../../inputs/AttendanceWhereInput";
import { AttendanceWhereUniqueInput } from "../../../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  where?: AttendanceWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AttendanceOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: AttendanceOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: true
  })
  cursor?: AttendanceWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
