import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByUserPasswordArgs } from "./args/GroupByUserPasswordArgs";
import { UserPassword } from "../../../models/UserPassword";
import { UserPasswordGroupBy } from "../../outputs/UserPasswordGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => UserPassword)
export class GroupByUserPasswordResolver {
  @TypeGraphQL.Query(_returns => [UserPasswordGroupBy], {
    nullable: false
  })
  async groupByUserPassword(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByUserPasswordArgs): Promise<UserPasswordGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).userPassword.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
