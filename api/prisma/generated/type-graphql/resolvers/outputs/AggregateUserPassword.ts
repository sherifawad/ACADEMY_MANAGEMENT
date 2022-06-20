import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCountAggregate } from "../outputs/UserPasswordCountAggregate";
import { UserPasswordMaxAggregate } from "../outputs/UserPasswordMaxAggregate";
import { UserPasswordMinAggregate } from "../outputs/UserPasswordMinAggregate";

@TypeGraphQL.ObjectType("AggregateUserPassword", {
  isAbstract: true
})
export class AggregateUserPassword {
  @TypeGraphQL.Field(_type => UserPasswordCountAggregate, {
    nullable: true
  })
  _count!: UserPasswordCountAggregate | null;

  @TypeGraphQL.Field(_type => UserPasswordMinAggregate, {
    nullable: true
  })
  _min!: UserPasswordMinAggregate | null;

  @TypeGraphQL.Field(_type => UserPasswordMaxAggregate, {
    nullable: true
  })
  _max!: UserPasswordMaxAggregate | null;
}
