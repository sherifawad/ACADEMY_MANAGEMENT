import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactWhereUniqueInput } from "../../../inputs/ContactWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueContactArgs {
  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: false
  })
  where!: ContactWhereUniqueInput;
}
