import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamOrderByWithRelationInput } from "../../../inputs/ExamOrderByWithRelationInput";
import { ExamWhereInput } from "../../../inputs/ExamWhereInput";
import { ExamWhereUniqueInput } from "../../../inputs/ExamWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateExamArgs {
  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  where?: ExamWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ExamOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ExamOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: true
  })
  cursor?: ExamWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
