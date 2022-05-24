import * as TypeGraphQL from "type-graphql";
import { RefreshToken } from "../../../models/RefreshToken";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => RefreshToken)
export class RefreshTokenRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() refreshToken: RefreshToken, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).refreshToken.findUnique({
      where: {
        id: refreshToken.id,
      },
    }).user({});
  }
}
