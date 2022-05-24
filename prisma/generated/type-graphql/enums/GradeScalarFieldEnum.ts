import * as TypeGraphQL from "type-graphql";

export enum GradeScalarFieldEnum {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(GradeScalarFieldEnum, {
  name: "GradeScalarFieldEnum",
  description: undefined,
});
