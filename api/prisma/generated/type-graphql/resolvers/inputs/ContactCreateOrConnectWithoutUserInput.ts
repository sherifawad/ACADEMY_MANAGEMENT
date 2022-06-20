import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCreateWithoutUserInput } from "../inputs/ContactCreateWithoutUserInput";
import { ContactWhereUniqueInput } from "../inputs/ContactWhereUniqueInput";

@TypeGraphQL.InputType("ContactCreateOrConnectWithoutUserInput", {
  isAbstract: true
})
export class ContactCreateOrConnectWithoutUserInput {
  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: false
  })
  where!: ContactWhereUniqueInput;

  @TypeGraphQL.Field(_type => ContactCreateWithoutUserInput, {
    nullable: false
  })
  create!: ContactCreateWithoutUserInput;
}
