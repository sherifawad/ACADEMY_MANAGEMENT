import * as TypeGraphQL from "type-graphql";
import { Grade } from "../../../models/Grade";
import { Group } from "../../../models/Group";
import { GradeGroupsArgs } from "./args/GradeGroupsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Grade)
export class GradeRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Group], {
    nullable: false
  })
  async groups(@TypeGraphQL.Root() grade: Grade, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: GradeGroupsArgs): Promise<Group[]> {
    return getPrismaFromContext(ctx).grade.findUnique({
      where: {
        id: grade.id,
      },
    }).groups(args);
  }
}
