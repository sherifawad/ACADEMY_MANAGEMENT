import * as TypeGraphQL from "type-graphql";

export enum ProfileScalarFieldEnum {
  id = "id",
  bio = "bio",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  createdBy = "createdBy",
  updatedBy = "updatedBy",
  groupId = "groupId"
}
TypeGraphQL.registerEnumType(ProfileScalarFieldEnum, {
  name: "ProfileScalarFieldEnum",
  description: undefined,
});
