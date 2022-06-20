import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateExamArgs } from "./args/AggregateExamArgs";
import { Exam } from "../../../models/Exam";
import { AggregateExam } from "../../outputs/AggregateExam";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Exam)
export class AggregateExamResolver {
  @TypeGraphQL.Query(_returns => AggregateExam, {
    nullable: false
  })
  async aggregateExam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateExamArgs): Promise<AggregateExam> {
    return getPrismaFromContext(ctx).exam.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
