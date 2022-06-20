import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateWithoutGroupInput } from "../inputs/ProfileCreateWithoutGroupInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileCreateOrConnectWithoutGroupInput", {
  isAbstract: true
})
export class ProfileCreateOrConnectWithoutGroupInput {
  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: false
  })
  where!: ProfileWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProfileCreateWithoutGroupInput, {
    nullable: false
  })
  create!: ProfileCreateWithoutGroupInput;
}
