import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("ProfileScalarWhereInput", {
  isAbstract: true
})
export class ProfileScalarWhereInput {
  @TypeGraphQL.Field(_type => [ProfileScalarWhereInput], {
    nullable: true
  })
  AND?: ProfileScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileScalarWhereInput], {
    nullable: true
  })
  OR?: ProfileScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileScalarWhereInput], {
    nullable: true
  })
  NOT?: ProfileScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  bio?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  createdBy?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  updatedBy?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  groupId?: StringFilter | undefined;
}
