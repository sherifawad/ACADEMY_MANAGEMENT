import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Attendance } from "../models/Attendance";
import { Grade } from "../models/Grade";
import { Profile } from "../models/Profile";
import { GroupCount } from "../resolvers/outputs/GroupCount";

@TypeGraphQL.ObjectType("Group", {
  isAbstract: true
})
export class Group {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isActive!: boolean;

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
  startAt?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  endAt?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  createdBy!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  updatedBy?: string | null;

  profiles?: Profile[];

  attendance?: Attendance[];

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  gradeId!: string;

  grade?: Grade | null;

  @TypeGraphQL.Field(_type => GroupCount, {
    nullable: true
  })
  _count?: GroupCount | null;
}
