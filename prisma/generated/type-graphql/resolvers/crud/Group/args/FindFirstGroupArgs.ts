import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GroupOrderByWithRelationInput } from "../../../inputs/GroupOrderByWithRelationInput";
import { GroupWhereInput } from "../../../inputs/GroupWhereInput";
import { GroupWhereUniqueInput } from "../../../inputs/GroupWhereUniqueInput";
import { GroupScalarFieldEnum } from "../../../../enums/GroupScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstGroupArgs {
  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  where?: GroupWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GroupOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: GroupOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  cursor?: GroupWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [GroupScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "name" | "isActive" | "createdAt" | "updatedAt" | "startAt" | "endAt" | "createdBy" | "updatedBy" | "gradeId"> | undefined;
}
