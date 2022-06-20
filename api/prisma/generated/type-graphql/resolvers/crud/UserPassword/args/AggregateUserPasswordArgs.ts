import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordOrderByWithRelationInput } from "../../../inputs/UserPasswordOrderByWithRelationInput";
import { UserPasswordWhereInput } from "../../../inputs/UserPasswordWhereInput";
import { UserPasswordWhereUniqueInput } from "../../../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordWhereInput, {
    nullable: true
  })
  where?: UserPasswordWhereInput | undefined;

  @TypeGraphQL.Field(_type => [UserPasswordOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: UserPasswordOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: true
  })
  cursor?: UserPasswordWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
