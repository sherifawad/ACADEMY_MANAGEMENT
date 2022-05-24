import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateGradeArgs } from "./args/AggregateGradeArgs";
import { Grade } from "../../../models/Grade";
import { AggregateGrade } from "../../outputs/AggregateGrade";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Grade)
export class AggregateGradeResolver {
  @TypeGraphQL.Query(_returns => AggregateGrade, {
    nullable: false
  })
  async aggregateGrade(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateGradeArgs): Promise<AggregateGrade> {
    return getPrismaFromContext(ctx).grade.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
