import * as TypeGraphQL from "type-graphql";

export enum GroupScalarFieldEnum {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  startAt = "startAt",
  endAt = "endAt",
  gradeId = "gradeId"
}
TypeGraphQL.registerEnumType(GroupScalarFieldEnum, {
  name: "GroupScalarFieldEnum",
  description: undefined,
});
