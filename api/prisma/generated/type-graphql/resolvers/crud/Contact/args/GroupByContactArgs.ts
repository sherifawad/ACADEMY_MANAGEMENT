import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactOrderByWithAggregationInput } from "../../../inputs/ContactOrderByWithAggregationInput";
import { ContactScalarWhereWithAggregatesInput } from "../../../inputs/ContactScalarWhereWithAggregatesInput";
import { ContactWhereInput } from "../../../inputs/ContactWhereInput";
import { ContactScalarFieldEnum } from "../../../../enums/ContactScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByContactArgs {
  @TypeGraphQL.Field(_type => ContactWhereInput, {
    nullable: true
  })
  where?: ContactWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ContactOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ContactOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ContactScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "email" | "emailConfirmed" | "phone" | "parentsPhones" | "address" | "note">;

  @TypeGraphQL.Field(_type => ContactScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ContactScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
