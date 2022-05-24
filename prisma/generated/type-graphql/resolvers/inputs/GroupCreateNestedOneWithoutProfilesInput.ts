import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateOrConnectWithoutProfilesInput } from "../inputs/GroupCreateOrConnectWithoutProfilesInput";
import { GroupCreateWithoutProfilesInput } from "../inputs/GroupCreateWithoutProfilesInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupCreateNestedOneWithoutProfilesInput", {
  isAbstract: true
})
export class GroupCreateNestedOneWithoutProfilesInput {
  @TypeGraphQL.Field(_type => GroupCreateWithoutProfilesInput, {
    nullable: true
  })
  create?: GroupCreateWithoutProfilesInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateOrConnectWithoutProfilesInput, {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutProfilesInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  connect?: GroupWhereUniqueInput | undefined;
}
