import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateManyGroupInputEnvelope } from "../inputs/ProfileCreateManyGroupInputEnvelope";
import { ProfileCreateOrConnectWithoutGroupInput } from "../inputs/ProfileCreateOrConnectWithoutGroupInput";
import { ProfileCreateWithoutGroupInput } from "../inputs/ProfileCreateWithoutGroupInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileCreateNestedManyWithoutGroupInput", {
  isAbstract: true
})
export class ProfileCreateNestedManyWithoutGroupInput {
  @TypeGraphQL.Field(_type => [ProfileCreateWithoutGroupInput], {
    nullable: true
  })
  create?: ProfileCreateWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileCreateOrConnectWithoutGroupInput], {
    nullable: true
  })
  connectOrCreate?: ProfileCreateOrConnectWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateManyGroupInputEnvelope, {
    nullable: true
  })
  createMany?: ProfileCreateManyGroupInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereUniqueInput], {
    nullable: true
  })
  connect?: ProfileWhereUniqueInput[] | undefined;
}
