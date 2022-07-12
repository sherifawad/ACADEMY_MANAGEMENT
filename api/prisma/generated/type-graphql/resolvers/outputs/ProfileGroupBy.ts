import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCountAggregate } from "../outputs/ProfileCountAggregate";
import { ProfileMaxAggregate } from "../outputs/ProfileMaxAggregate";
import { ProfileMinAggregate } from "../outputs/ProfileMinAggregate";

@TypeGraphQL.ObjectType("ProfileGroupBy", {
  isAbstract: true
})
export class ProfileGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  bio!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

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
  groupId!: string;

  @TypeGraphQL.Field(_type => ProfileCountAggregate, {
    nullable: true
  })
  _count!: ProfileCountAggregate | null;

  @TypeGraphQL.Field(_type => ProfileMinAggregate, {
    nullable: true
  })
  _min!: ProfileMinAggregate | null;

  @TypeGraphQL.Field(_type => ProfileMaxAggregate, {
    nullable: true
  })
  _max!: ProfileMaxAggregate | null;
}