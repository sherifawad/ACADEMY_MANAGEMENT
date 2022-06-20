import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactWhereInput } from "../inputs/ContactWhereInput";

@TypeGraphQL.InputType("ContactRelationFilter", {
  isAbstract: true
})
export class ContactRelationFilter {
  @TypeGraphQL.Field(_type => ContactWhereInput, {
    nullable: true
  })
  is?: ContactWhereInput | undefined;

  @TypeGraphQL.Field(_type => ContactWhereInput, {
    nullable: true
  })
  isNot?: ContactWhereInput | undefined;
}
