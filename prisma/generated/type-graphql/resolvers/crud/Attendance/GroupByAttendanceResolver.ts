import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByAttendanceArgs } from "./args/GroupByAttendanceArgs";
import { Attendance } from "../../../models/Attendance";
import { AttendanceGroupBy } from "../../outputs/AttendanceGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Attendance)
export class GroupByAttendanceResolver {
  @TypeGraphQL.Query(_returns => [AttendanceGroupBy], {
    nullable: false
  })
  async groupByAttendance(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByAttendanceArgs): Promise<AttendanceGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).attendance.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
