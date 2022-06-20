import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateContactArgs } from "./args/AggregateContactArgs";
import { Contact } from "../../../models/Contact";
import { AggregateContact } from "../../outputs/AggregateContact";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Contact)
export class AggregateContactResolver {
  @TypeGraphQL.Query(_returns => AggregateContact, {
    nullable: false
  })
  async aggregateContact(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateContactArgs): Promise<AggregateContact> {
    return getPrismaFromContext(ctx).contact.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
