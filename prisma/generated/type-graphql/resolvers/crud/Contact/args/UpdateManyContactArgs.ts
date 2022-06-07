import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactUpdateManyMutationInput } from "../../../inputs/ContactUpdateManyMutationInput";
import { ContactWhereInput } from "../../../inputs/ContactWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyContactArgs {
  @TypeGraphQL.Field(_type => ContactUpdateManyMutationInput, {
    nullable: false
  })
  data!: ContactUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ContactWhereInput, {
    nullable: true
  })
  where?: ContactWhereInput | undefined;
}
