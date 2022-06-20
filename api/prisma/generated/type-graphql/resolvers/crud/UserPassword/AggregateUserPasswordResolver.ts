import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateUserPasswordArgs } from "./args/AggregateUserPasswordArgs";
import { UserPassword } from "../../../models/UserPassword";
import { AggregateUserPassword } from "../../outputs/AggregateUserPassword";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => UserPassword)
export class AggregateUserPasswordResolver {
  @TypeGraphQL.Query(_returns => AggregateUserPassword, {
    nullable: false
  })
  async aggregateUserPassword(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateUserPasswordArgs): Promise<AggregateUserPassword> {
    return getPrismaFromContext(ctx).userPassword.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
