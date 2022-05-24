import * as TypeGraphQL from "type-graphql";

export enum RefreshTokenScalarFieldEnum {
  id = "id",
  label = "label",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  hash = "hash",
  valid = "valid",
  expiration = "expiration",
  userId = "userId"
}
TypeGraphQL.registerEnumType(RefreshTokenScalarFieldEnum, {
  name: "RefreshTokenScalarFieldEnum",
  description: undefined,
});
