import * as TypeGraphQL from "type-graphql";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  Student = "Student"
}
TypeGraphQL.registerEnumType(Role, {
  name: "Role",
  description: undefined,
});
