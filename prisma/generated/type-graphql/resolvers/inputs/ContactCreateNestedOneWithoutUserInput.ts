import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCreateOrConnectWithoutUserInput } from "../inputs/ContactCreateOrConnectWithoutUserInput";
import { ContactCreateWithoutUserInput } from "../inputs/ContactCreateWithoutUserInput";
import { ContactWhereUniqueInput } from "../inputs/ContactWhereUniqueInput";

@TypeGraphQL.InputType("ContactCreateNestedOneWithoutUserInput", {
  isAbstract: true
})
export class ContactCreateNestedOneWithoutUserInput {
  @TypeGraphQL.Field(_type => ContactCreateWithoutUserInput, {
    nullable: true
  })
  create?: ContactCreateWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ContactCreateOrConnectWithoutUserInput, {
    nullable: true
  })
  connectOrCreate?: ContactCreateOrConnectWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: true
  })
  connect?: ContactWhereUniqueInput | undefined;
}
