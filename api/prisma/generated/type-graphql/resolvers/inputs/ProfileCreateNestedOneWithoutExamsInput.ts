import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateOrConnectWithoutExamsInput } from "../inputs/ProfileCreateOrConnectWithoutExamsInput";
import { ProfileCreateWithoutExamsInput } from "../inputs/ProfileCreateWithoutExamsInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileCreateNestedOneWithoutExamsInput", {
  isAbstract: true
})
export class ProfileCreateNestedOneWithoutExamsInput {
  @TypeGraphQL.Field(_type => ProfileCreateWithoutExamsInput, {
    nullable: true
  })
  create?: ProfileCreateWithoutExamsInput | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateOrConnectWithoutExamsInput, {
    nullable: true
  })
  connectOrCreate?: ProfileCreateOrConnectWithoutExamsInput | undefined;

  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: true
  })
  connect?: ProfileWhereUniqueInput | undefined;
}
