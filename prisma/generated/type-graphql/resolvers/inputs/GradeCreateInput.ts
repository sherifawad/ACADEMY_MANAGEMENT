import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateNestedManyWithoutGradeInput } from "../inputs/GroupCreateNestedManyWithoutGradeInput";

@TypeGraphQL.InputType("GradeCreateInput", {
  isAbstract: true
})
export class GradeCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => GroupCreateNestedManyWithoutGradeInput, {
    nullable: true
  })
  groups?: GroupCreateNestedManyWithoutGradeInput | undefined;
}
