import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceOrderByWithAggregationInput } from "../../../inputs/AttendanceOrderByWithAggregationInput";
import { AttendanceScalarWhereWithAggregatesInput } from "../../../inputs/AttendanceScalarWhereWithAggregatesInput";
import { AttendanceWhereInput } from "../../../inputs/AttendanceWhereInput";
import { AttendanceScalarFieldEnum } from "../../../../enums/AttendanceScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByAttendanceArgs {
  @TypeGraphQL.Field(_type => AttendanceWhereInput, {
    nullable: true
  })
  where?: AttendanceWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AttendanceOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: AttendanceOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "startAt" | "endAt" | "note" | "createdBy" | "updatedBy" | "profileId" | "groupId">;

  @TypeGraphQL.Field(_type => AttendanceScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: AttendanceScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
