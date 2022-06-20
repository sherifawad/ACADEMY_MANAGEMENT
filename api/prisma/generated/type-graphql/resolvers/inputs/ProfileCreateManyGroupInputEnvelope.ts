import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateManyGroupInput } from "../inputs/ProfileCreateManyGroupInput";

@TypeGraphQL.InputType("ProfileCreateManyGroupInputEnvelope", {
  isAbstract: true
})
export class ProfileCreateManyGroupInputEnvelope {
  @TypeGraphQL.Field(_type => [ProfileCreateManyGroupInput], {
    nullable: false
  })
  data!: ProfileCreateManyGroupInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
