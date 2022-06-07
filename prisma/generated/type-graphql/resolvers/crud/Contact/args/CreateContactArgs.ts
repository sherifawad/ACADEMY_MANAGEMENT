import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactCreateInput } from "../../../inputs/ContactCreateInput";

@TypeGraphQL.ArgsType()
export class CreateContactArgs {
  @TypeGraphQL.Field(_type => ContactCreateInput, {
    nullable: false
  })
  data!: ContactCreateInput;
}
