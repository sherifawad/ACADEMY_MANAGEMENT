import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordOrderByWithAggregationInput } from "../../../inputs/UserPasswordOrderByWithAggregationInput";
import { UserPasswordScalarWhereWithAggregatesInput } from "../../../inputs/UserPasswordScalarWhereWithAggregatesInput";
import { UserPasswordWhereInput } from "../../../inputs/UserPasswordWhereInput";
import { UserPasswordScalarFieldEnum } from "../../../../enums/UserPasswordScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordWhereInput, {
    nullable: true
  })
  where?: UserPasswordWhereInput | undefined;

  @TypeGraphQL.Field(_type => [UserPasswordOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: UserPasswordOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserPasswordScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "password" | "forceChange" | "createdAt" | "updatedAt">;

  @TypeGraphQL.Field(_type => UserPasswordScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: UserPasswordScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
