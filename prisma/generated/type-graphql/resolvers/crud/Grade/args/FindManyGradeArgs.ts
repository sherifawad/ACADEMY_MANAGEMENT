import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeOrderByWithRelationInput } from "../../../inputs/GradeOrderByWithRelationInput";
import { GradeWhereInput } from "../../../inputs/GradeWhereInput";
import { GradeWhereUniqueInput } from "../../../inputs/GradeWhereUniqueInput";
import { GradeScalarFieldEnum } from "../../../../enums/GradeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyGradeArgs {
  @TypeGraphQL.Field(_type => GradeWhereInput, {
    nullable: true
  })
  where?: GradeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GradeOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: GradeOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: true
  })
  cursor?: GradeWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [GradeScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "name" | "createdAt" | "updatedAt"> | undefined;
}
