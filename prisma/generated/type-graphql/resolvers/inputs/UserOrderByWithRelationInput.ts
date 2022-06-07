import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactOrderByWithRelationInput } from "../inputs/ContactOrderByWithRelationInput";
import { ProfileOrderByWithRelationInput } from "../inputs/ProfileOrderByWithRelationInput";
import { RefreshTokenOrderByRelationAggregateInput } from "../inputs/RefreshTokenOrderByRelationAggregateInput";
import { UserPasswordOrderByWithRelationInput } from "../inputs/UserPasswordOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("UserOrderByWithRelationInput", {
  isAbstract: true
})
export class UserOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  avatar?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ContactOrderByWithRelationInput, {
    nullable: true
  })
  contact?: ContactOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  isActive?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  role?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => UserPasswordOrderByWithRelationInput, {
    nullable: true
  })
  password?: UserPasswordOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => ProfileOrderByWithRelationInput, {
    nullable: true
  })
  profile?: ProfileOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => RefreshTokenOrderByRelationAggregateInput, {
    nullable: true
  })
  tokens?: RefreshTokenOrderByRelationAggregateInput | undefined;
}
