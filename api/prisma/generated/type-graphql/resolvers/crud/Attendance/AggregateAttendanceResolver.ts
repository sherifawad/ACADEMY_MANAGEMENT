import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateAttendanceArgs } from "./args/AggregateAttendanceArgs";
import { Attendance } from "../../../models/Attendance";
import { AggregateAttendance } from "../../outputs/AggregateAttendance";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Attendance)
export class AggregateAttendanceResolver {
  @TypeGraphQL.Query(_returns => AggregateAttendance, {
    nullable: false
  })
  async aggregateAttendance(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateAttendanceArgs): Promise<AggregateAttendance> {
    return getPrismaFromContext(ctx).attendance.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
