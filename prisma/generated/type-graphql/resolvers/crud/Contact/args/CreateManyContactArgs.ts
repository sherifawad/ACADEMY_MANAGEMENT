import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactCreateManyInput } from "../../../inputs/ContactCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyContactArgs {
  @TypeGraphQL.Field(_type => [ContactCreateManyInput], {
    nullable: false
  })
  data!: ContactCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
