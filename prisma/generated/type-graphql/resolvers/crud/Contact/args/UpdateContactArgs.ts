import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactUpdateInput } from "../../../inputs/ContactUpdateInput";
import { ContactWhereUniqueInput } from "../../../inputs/ContactWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateContactArgs {
  @TypeGraphQL.Field(_type => ContactUpdateInput, {
    nullable: false
  })
  data!: ContactUpdateInput;

  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: false
  })
  where!: ContactWhereUniqueInput;
}
