import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCountAggregate } from "../outputs/UserPasswordCountAggregate";
import { UserPasswordMaxAggregate } from "../outputs/UserPasswordMaxAggregate";
import { UserPasswordMinAggregate } from "../outputs/UserPasswordMinAggregate";

@TypeGraphQL.ObjectType("UserPasswordGroupBy", {
  isAbstract: true
})
export class UserPasswordGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  forceChange!: boolean;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

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
