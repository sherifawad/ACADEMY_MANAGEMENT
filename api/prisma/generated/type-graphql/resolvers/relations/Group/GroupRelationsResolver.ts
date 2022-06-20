import * as TypeGraphQL from "type-graphql";
import { Attendance } from "../../../models/Attendance";
import { Grade } from "../../../models/Grade";
import { Group } from "../../../models/Group";
import { Profile } from "../../../models/Profile";
import { GroupAttendanceArgs } from "./args/GroupAttendanceArgs";
import { GroupProfilesArgs } from "./args/GroupProfilesArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Group)
export class GroupRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Profile], {
    nullable: false
  })
  async profiles(@TypeGraphQL.Root() group: Group, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: GroupProfilesArgs): Promise<Profile[]> {
    return getPrismaFromContext(ctx).group.findUnique({
      where: {
        id: group.id,
      },
    }).profiles(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Attendance], {
    nullable: false
  })
  async attendance(@TypeGraphQL.Root() group: Group, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: GroupAttendanceArgs): Promise<Attendance[]> {
    return getPrismaFromContext(ctx).group.findUnique({
      where: {
        id: group.id,
      },
    }).attendance(args);
  }

  @TypeGraphQL.FieldResolver(_type => Grade, {
    nullable: true
  })
  async grade(@TypeGraphQL.Root() group: Group, @TypeGraphQL.Ctx() ctx: any): Promise<Grade | null> {
    return getPrismaFromContext(ctx).group.findUnique({
      where: {
        id: group.id,
      },
    }).grade({});
  }
}
