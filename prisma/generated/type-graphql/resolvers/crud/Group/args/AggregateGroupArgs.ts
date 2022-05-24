import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GroupOrderByWithRelationInput } from "../../../inputs/GroupOrderByWithRelationInput";
import { GroupWhereInput } from "../../../inputs/GroupWhereInput";
import { GroupWhereUniqueInput } from "../../../inputs/GroupWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateGroupArgs {
  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  where?: GroupWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GroupOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: GroupOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  cursor?: GroupWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
