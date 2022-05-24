import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateOrConnectWithoutExamsInput } from "../inputs/ProfileCreateOrConnectWithoutExamsInput";
import { ProfileCreateWithoutExamsInput } from "../inputs/ProfileCreateWithoutExamsInput";
import { ProfileUpdateWithoutExamsInput } from "../inputs/ProfileUpdateWithoutExamsInput";
import { ProfileUpsertWithoutExamsInput } from "../inputs/ProfileUpsertWithoutExamsInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileUpdateOneWithoutExamsInput", {
  isAbstract: true
})
export class ProfileUpdateOneWithoutExamsInput {
  @TypeGraphQL.Field(_type => ProfileCreateWithoutExamsInput, {
    nullable: true
  })
  create?: ProfileCreateWithoutExamsInput | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateOrConnectWithoutExamsInput, {
    nullable: true
  })
  connectOrCreate?: ProfileCreateOrConnectWithoutExamsInput | undefined;

  @TypeGraphQL.Field(_type => ProfileUpsertWithoutExamsInput, {
    nullable: true
  })
  upsert?: ProfileUpsertWithoutExamsInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: true
  })
  connect?: ProfileWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ProfileUpdateWithoutExamsInput, {
    nullable: true
  })
  update?: ProfileUpdateWithoutExamsInput | undefined;
}
