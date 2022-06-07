import * as TypeGraphQL from "type-graphql";
import { Contact } from "../../../models/Contact";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Contact)
export class ContactRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() contact: Contact, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).contact.findUnique({
      where: {
        id: contact.id,
      },
    }).user({});
  }
}
