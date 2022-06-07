import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ContactOrderByWithRelationInput } from "../../../inputs/ContactOrderByWithRelationInput";
import { ContactWhereInput } from "../../../inputs/ContactWhereInput";
import { ContactWhereUniqueInput } from "../../../inputs/ContactWhereUniqueInput";
import { ContactScalarFieldEnum } from "../../../../enums/ContactScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyContactArgs {
  @TypeGraphQL.Field(_type => ContactWhereInput, {
    nullable: true
  })
  where?: ContactWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ContactOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ContactOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ContactWhereUniqueInput, {
    nullable: true
  })
  cursor?: ContactWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ContactScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "email" | "emailConfirmed" | "phone" | "parentsPhones" | "address" | "note"> | undefined;
}
