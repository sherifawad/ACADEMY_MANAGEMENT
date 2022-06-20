import * as TypeGraphQL from "type-graphql";

export enum GradeScalarFieldEnum {
  id = "id",
  name = "name",
  isActive = "isActive",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  createdBy = "createdBy",
  updatedBy = "updatedBy"
}
TypeGraphQL.registerEnumType(GradeScalarFieldEnum, {
  name: "GradeScalarFieldEnum",
  description: undefined,
});
