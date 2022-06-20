import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactOrderByWithRelationInput } from "../../../inputs/ContactOrderByWithRelationInput";
import { ContactWhereInput } from "../../../inputs/ContactWhereInput";
import { ContactWhereUniqueInput } from "../../../inputs/ContactWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateContactArgs {
  @TypeGraphQL.Field(_type => ContactWhereInput, {
    nullable: true
  })
  where?: ContactWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ContactOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ContactOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: true
  })
  cursor?: ContactWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
