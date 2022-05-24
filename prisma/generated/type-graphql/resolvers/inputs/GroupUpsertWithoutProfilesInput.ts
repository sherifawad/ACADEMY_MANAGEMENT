import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateWithoutProfilesInput } from "../inputs/GroupCreateWithoutProfilesInput";
import { GroupUpdateWithoutProfilesInput } from "../inputs/GroupUpdateWithoutProfilesInput";

@TypeGraphQL.InputType("GroupUpsertWithoutProfilesInput", {
  isAbstract: true
})
export class GroupUpsertWithoutProfilesInput {
  @TypeGraphQL.Field(_type => GroupUpdateWithoutProfilesInput, {
    nullable: false
  })
  update!: GroupUpdateWithoutProfilesInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutProfilesInput, {
    nullable: false
  })
  create!: GroupCreateWithoutProfilesInput;
}
