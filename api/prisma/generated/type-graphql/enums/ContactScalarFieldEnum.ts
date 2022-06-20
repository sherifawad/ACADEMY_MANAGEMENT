import * as TypeGraphQL from "type-graphql";

export enum ContactScalarFieldEnum {
  id = "id",
  email = "email",
  emailConfirmed = "emailConfirmed",
  phone = "phone",
  parentsPhones = "parentsPhones",
  address = "address",
  note = "note"
}
TypeGraphQL.registerEnumType(ContactScalarFieldEnum, {
  name: "ContactScalarFieldEnum",
  description: undefined,
});
