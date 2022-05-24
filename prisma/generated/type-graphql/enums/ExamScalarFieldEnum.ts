import * as TypeGraphQL from "type-graphql";

export enum ExamScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  score = "score",
  note = "note",
  profileId = "profileId"
}
TypeGraphQL.registerEnumType(ExamScalarFieldEnum, {
  name: "ExamScalarFieldEnum",
  description: undefined,
});
