import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateManyGroupInputEnvelope } from "../inputs/ProfileCreateManyGroupInputEnvelope";
import { ProfileCreateOrConnectWithoutGroupInput } from "../inputs/ProfileCreateOrConnectWithoutGroupInput";
import { ProfileCreateWithoutGroupInput } from "../inputs/ProfileCreateWithoutGroupInput";
import { ProfileScalarWhereInput } from "../inputs/ProfileScalarWhereInput";
import { ProfileUpdateManyWithWhereWithoutGroupInput } from "../inputs/ProfileUpdateManyWithWhereWithoutGroupInput";
import { ProfileUpdateWithWhereUniqueWithoutGroupInput } from "../inputs/ProfileUpdateWithWhereUniqueWithoutGroupInput";
import { ProfileUpsertWithWhereUniqueWithoutGroupInput } from "../inputs/ProfileUpsertWithWhereUniqueWithoutGroupInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileUpdateManyWithoutGroupInput", {
  isAbstract: true
})
export class ProfileUpdateManyWithoutGroupInput {
  @TypeGraphQL.Field(_type => [ProfileCreateWithoutGroupInput], {
    nullable: true
  })
  create?: ProfileCreateWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileCreateOrConnectWithoutGroupInput], {
    nullable: true
  })
  connectOrCreate?: ProfileCreateOrConnectWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileUpsertWithWhereUniqueWithoutGroupInput], {
    nullable: true
  })
  upsert?: ProfileUpsertWithWhereUniqueWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateManyGroupInputEnvelope, {
    nullable: true
  })
  createMany?: ProfileCreateManyGroupInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereUniqueInput], {
    nullable: true
  })
  set?: ProfileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ProfileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereUniqueInput], {
    nullable: true
  })
  delete?: ProfileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereUniqueInput], {
    nullable: true
  })
  connect?: ProfileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileUpdateWithWhereUniqueWithoutGroupInput], {
    nullable: true
  })
  update?: ProfileUpdateWithWhereUniqueWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileUpdateManyWithWhereWithoutGroupInput], {
    nullable: true
  })
  updateMany?: ProfileUpdateManyWithWhereWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ProfileScalarWhereInput[] | undefined;
}
