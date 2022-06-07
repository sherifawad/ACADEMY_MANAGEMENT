import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCreateWithoutUserInput } from "../inputs/ContactCreateWithoutUserInput";
import { ContactUpdateWithoutUserInput } from "../inputs/ContactUpdateWithoutUserInput";

@TypeGraphQL.InputType("ContactUpsertWithoutUserInput", {
  isAbstract: true
})
export class ContactUpsertWithoutUserInput {
  @TypeGraphQL.Field(_type => ContactUpdateWithoutUserInput, {
    nullable: false
  })
  update!: ContactUpdateWithoutUserInput;

  @TypeGraphQL.Field(_type => ContactCreateWithoutUserInput, {
    nullable: false
  })
  create!: ContactCreateWithoutUserInput;
}
