import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCreateOrConnectWithoutUserInput } from "../inputs/ContactCreateOrConnectWithoutUserInput";
import { ContactCreateWithoutUserInput } from "../inputs/ContactCreateWithoutUserInput";
import { ContactUpdateWithoutUserInput } from "../inputs/ContactUpdateWithoutUserInput";
import { ContactUpsertWithoutUserInput } from "../inputs/ContactUpsertWithoutUserInput";
import { ContactWhereUniqueInput } from "../inputs/ContactWhereUniqueInput";

@TypeGraphQL.InputType("ContactUpdateOneWithoutUserInput", {
  isAbstract: true
})
export class ContactUpdateOneWithoutUserInput {
  @TypeGraphQL.Field(_type => ContactCreateWithoutUserInput, {
    nullable: true
  })
  create?: ContactCreateWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ContactCreateOrConnectWithoutUserInput, {
    nullable: true
  })
  connectOrCreate?: ContactCreateOrConnectWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ContactUpsertWithoutUserInput, {
    nullable: true
  })
  upsert?: ContactUpsertWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: true
  })
  connect?: ContactWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ContactUpdateWithoutUserInput, {
    nullable: true
  })
  update?: ContactUpdateWithoutUserInput | undefined;
}
