import * as TypeGraphQL from "type-graphql";

export enum GroupScalarFieldEnum {
  id = "id",
  name = "name",
  isActive = "isActive",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  startAt = "startAt",
  endAt = "endAt",
  createdBy = "createdBy",
  updatedBy = "updatedBy",
  gradeId = "gradeId"
}
TypeGraphQL.registerEnumType(GroupScalarFieldEnum, {
  name: "GroupScalarFieldEnum",
  description: undefined,
});
