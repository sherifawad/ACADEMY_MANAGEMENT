import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Group } from "../models/Group";
import { GradeCount } from "../resolvers/outputs/GradeCount";

@TypeGraphQL.ObjectType("Grade", {
  isAbstract: true
})
export class Grade {
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

  groups?: Group[];

  @TypeGraphQL.Field(_type => GradeCount, {
    nullable: true
  })
  _count?: GradeCount | null;
}
