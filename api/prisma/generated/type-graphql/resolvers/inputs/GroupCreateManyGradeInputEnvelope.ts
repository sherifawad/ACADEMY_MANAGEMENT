import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateManyGradeInput } from "../inputs/GroupCreateManyGradeInput";

@TypeGraphQL.InputType("GroupCreateManyGradeInputEnvelope", {
  isAbstract: true
})
export class GroupCreateManyGradeInputEnvelope {
  @TypeGraphQL.Field(_type => [GroupCreateManyGradeInput], {
    nullable: false
  })
  data!: GroupCreateManyGradeInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
