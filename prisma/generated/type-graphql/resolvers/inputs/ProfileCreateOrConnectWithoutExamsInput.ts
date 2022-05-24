import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateWithoutExamsInput } from "../inputs/ProfileCreateWithoutExamsInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileCreateOrConnectWithoutExamsInput", {
  isAbstract: true
})
export class ProfileCreateOrConnectWithoutExamsInput {
  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: false
  })
  where!: ProfileWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProfileCreateWithoutExamsInput, {
    nullable: false
  })
  create!: ProfileCreateWithoutExamsInput;
}
