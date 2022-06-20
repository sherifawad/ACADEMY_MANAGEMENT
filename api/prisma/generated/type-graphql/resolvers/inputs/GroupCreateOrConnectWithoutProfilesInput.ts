import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateWithoutProfilesInput } from "../inputs/GroupCreateWithoutProfilesInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupCreateOrConnectWithoutProfilesInput", {
  isAbstract: true
})
export class GroupCreateOrConnectWithoutProfilesInput {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutProfilesInput, {
    nullable: false
  })
  create!: GroupCreateWithoutProfilesInput;
}
