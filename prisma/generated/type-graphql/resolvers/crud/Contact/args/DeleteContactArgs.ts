import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactWhereUniqueInput } from "../../../inputs/ContactWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteContactArgs {
  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: false
  })
  where!: ContactWhereUniqueInput;
}
