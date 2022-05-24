import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordOrderByWithRelationInput } from "../../../inputs/UserPasswordOrderByWithRelationInput";
import { UserPasswordWhereInput } from "../../../inputs/UserPasswordWhereInput";
import { UserPasswordWhereUniqueInput } from "../../../inputs/UserPasswordWhereUniqueInput";
import { UserPasswordScalarFieldEnum } from "../../../../enums/UserPasswordScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstUserPasswordArgs {
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

  @TypeGraphQL.Field(_type => [UserPasswordScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "password" | "forceChange" | "createdAt" | "updatedAt"> | undefined;
}
