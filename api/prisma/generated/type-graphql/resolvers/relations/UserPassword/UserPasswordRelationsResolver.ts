import * as TypeGraphQL from "type-graphql";
import { User } from "../../../models/User";
import { UserPassword } from "../../../models/UserPassword";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => UserPassword)
export class UserPasswordRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() userPassword: UserPassword, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).userPassword.findUnique({
      where: {
        id: userPassword.id,
      },
    }).user({});
  }
}
