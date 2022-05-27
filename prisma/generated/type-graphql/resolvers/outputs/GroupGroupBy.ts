import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCountAggregate } from "../outputs/GroupCountAggregate";
import { GroupMaxAggregate } from "../outputs/GroupMaxAggregate";
import { GroupMinAggregate } from "../outputs/GroupMinAggregate";

@TypeGraphQL.ObjectType("GroupGroupBy", {
  isAbstract: true
})
export class GroupGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  startAt!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  endAt!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  createdBy!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  updatedBy!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  gradeId!: string;

  @TypeGraphQL.Field(_type => GroupCountAggregate, {
    nullable: true
  })
  _count!: GroupCountAggregate | null;

  @TypeGraphQL.Field(_type => GroupMinAggregate, {
    nullable: true
  })
  _min!: GroupMinAggregate | null;

  @TypeGraphQL.Field(_type => GroupMaxAggregate, {
    nullable: true
  })
  _max!: GroupMaxAggregate | null;
}
