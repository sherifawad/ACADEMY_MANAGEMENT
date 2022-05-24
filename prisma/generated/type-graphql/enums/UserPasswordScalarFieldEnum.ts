import * as TypeGraphQL from "type-graphql";

export enum UserPasswordScalarFieldEnum {
  id = "id",
  password = "password",
  forceChange = "forceChange",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(UserPasswordScalarFieldEnum, {
  name: "UserPasswordScalarFieldEnum",
  description: undefined,
});
