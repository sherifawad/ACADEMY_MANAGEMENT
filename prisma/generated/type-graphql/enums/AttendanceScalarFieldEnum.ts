import * as TypeGraphQL from "type-graphql";

export enum AttendanceScalarFieldEnum {
  id = "id",
  startAt = "startAt",
  endAt = "endAt",
  note = "note",
  profileId = "profileId",
  groupId = "groupId"
}
TypeGraphQL.registerEnumType(AttendanceScalarFieldEnum, {
  name: "AttendanceScalarFieldEnum",
  description: undefined,
});
