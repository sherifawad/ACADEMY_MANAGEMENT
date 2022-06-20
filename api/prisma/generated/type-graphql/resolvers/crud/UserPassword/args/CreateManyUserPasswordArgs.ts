import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordCreateManyInput } from "../../../inputs/UserPasswordCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyUserPasswordArgs {
  @TypeGraphQL.Field(_type => [UserPasswordCreateManyInput], {
    nullable: false
  })
  data!: UserPasswordCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
