import * as TypeGraphQL from "type-graphql";
import { Exam } from "../../../models/Exam";
import { Profile } from "../../../models/Profile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Exam)
export class ExamRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Profile, {
    nullable: true
  })
  async Profile(@TypeGraphQL.Root() exam: Exam, @TypeGraphQL.Ctx() ctx: any): Promise<Profile | null> {
    return getPrismaFromContext(ctx).exam.findUnique({
      where: {
        id: exam.id,
      },
    }).Profile({});
  }
}
