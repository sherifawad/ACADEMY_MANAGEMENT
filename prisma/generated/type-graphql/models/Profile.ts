import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Exam } from "../models/Exam";
import { Group } from "../models/Group";
import { User } from "../models/User";
import { ProfileCount } from "../resolvers/outputs/ProfileCount";

@TypeGraphQL.ObjectType("Profile", {
  isAbstract: true
})
export class Profile {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  bio?: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  user?: User;

  exams?: Exam[];

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  groupId!: string;

  group?: Group;

  @TypeGraphQL.Field(_type => ProfileCount, {
    nullable: true
  })
  _count?: ProfileCount | null;
}
