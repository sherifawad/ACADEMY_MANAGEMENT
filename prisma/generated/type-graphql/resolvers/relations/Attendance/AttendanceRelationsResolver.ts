import * as TypeGraphQL from "type-graphql";
import { Attendance } from "../../../models/Attendance";
import { Group } from "../../../models/Group";
import { Profile } from "../../../models/Profile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Attendance)
export class AttendanceRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Profile, {
    nullable: false
  })
  async Profile(@TypeGraphQL.Root() attendance: Attendance, @TypeGraphQL.Ctx() ctx: any): Promise<Profile> {
    return getPrismaFromContext(ctx).attendance.findUnique({
      where: {
        id: attendance.id,
      },
    }).Profile({});
  }

  @TypeGraphQL.FieldResolver(_type => Group, {
    nullable: true
  })
  async group(@TypeGraphQL.Root() attendance: Attendance, @TypeGraphQL.Ctx() ctx: any): Promise<Group | null> {
    return getPrismaFromContext(ctx).attendance.findUnique({
      where: {
        id: attendance.id,
      },
    }).group({});
  }
}
