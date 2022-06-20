import * as TypeGraphQL from "type-graphql";
import { Attendance } from "../../../models/Attendance";
import { Exam } from "../../../models/Exam";
import { Group } from "../../../models/Group";
import { Profile } from "../../../models/Profile";
import { User } from "../../../models/User";
import { ProfileAttendancesArgs } from "./args/ProfileAttendancesArgs";
import { ProfileExamsArgs } from "./args/ProfileExamsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Profile)
export class ProfileRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() profile: Profile, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).profile.findUnique({
      where: {
        id: profile.id,
      },
    }).user({});
  }

  @TypeGraphQL.FieldResolver(_type => [Exam], {
    nullable: false
  })
  async exams(@TypeGraphQL.Root() profile: Profile, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ProfileExamsArgs): Promise<Exam[]> {
    return getPrismaFromContext(ctx).profile.findUnique({
      where: {
        id: profile.id,
      },
    }).exams(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Attendance], {
    nullable: false
  })
  async attendances(@TypeGraphQL.Root() profile: Profile, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ProfileAttendancesArgs): Promise<Attendance[]> {
    return getPrismaFromContext(ctx).profile.findUnique({
      where: {
        id: profile.id,
      },
    }).attendances(args);
  }

  @TypeGraphQL.FieldResolver(_type => Group, {
    nullable: false
  })
  async group(@TypeGraphQL.Root() profile: Profile, @TypeGraphQL.Ctx() ctx: any): Promise<Group> {
    return getPrismaFromContext(ctx).profile.findUnique({
      where: {
        id: profile.id,
      },
    }).group({});
  }
}
