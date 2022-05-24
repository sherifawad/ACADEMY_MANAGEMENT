import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileScalarWhereInput } from "../inputs/ProfileScalarWhereInput";
import { ProfileUpdateManyMutationInput } from "../inputs/ProfileUpdateManyMutationInput";

@TypeGraphQL.InputType("ProfileUpdateManyWithWhereWithoutGroupInput", {
  isAbstract: true
})
export class ProfileUpdateManyWithWhereWithoutGroupInput {
  @TypeGraphQL.Field(_type => ProfileScalarWhereInput, {
    nullable: false
  })
  where!: ProfileScalarWhereInput;

  @TypeGraphQL.Field(_type => ProfileUpdateManyMutationInput, {
    nullable: false
  })
  data!: ProfileUpdateManyMutationInput;
}
