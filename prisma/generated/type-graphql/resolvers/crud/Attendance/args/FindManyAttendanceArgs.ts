import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AttendanceOrderByWithRelationInput } from "../../../inputs/AttendanceOrderByWithRelationInput";
import { AttendanceWhereInput } from "../../../inputs/AttendanceWhereInput";
import { AttendanceWhereUniqueInput } from "../../../inputs/AttendanceWhereUniqueInput";
import { AttendanceScalarFieldEnum } from "../../../../enums/AttendanceScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyAttendanceArgs {
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

  @TypeGraphQL.Field(_type => [AttendanceScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "startAt" | "endAt" | "note" | "profileId" | "groupId"> | undefined;
}
