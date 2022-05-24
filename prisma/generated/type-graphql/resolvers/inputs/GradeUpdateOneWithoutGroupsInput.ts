import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeCreateOrConnectWithoutGroupsInput } from "../inputs/GradeCreateOrConnectWithoutGroupsInput";
import { GradeCreateWithoutGroupsInput } from "../inputs/GradeCreateWithoutGroupsInput";
import { GradeUpdateWithoutGroupsInput } from "../inputs/GradeUpdateWithoutGroupsInput";
import { GradeUpsertWithoutGroupsInput } from "../inputs/GradeUpsertWithoutGroupsInput";
import { GradeWhereUniqueInput } from "../inputs/GradeWhereUniqueInput";

@TypeGraphQL.InputType("GradeUpdateOneWithoutGroupsInput", {
  isAbstract: true
})
export class GradeUpdateOneWithoutGroupsInput {
  @TypeGraphQL.Field(_type => GradeCreateWithoutGroupsInput, {
    nullable: true
  })
  create?: GradeCreateWithoutGroupsInput | undefined;

  @TypeGraphQL.Field(_type => GradeCreateOrConnectWithoutGroupsInput, {
    nullable: true
  })
  connectOrCreate?: GradeCreateOrConnectWithoutGroupsInput | undefined;

  @TypeGraphQL.Field(_type => GradeUpsertWithoutGroupsInput, {
    nullable: true
  })
  upsert?: GradeUpsertWithoutGroupsInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: true
  })
  connect?: GradeWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => GradeUpdateWithoutGroupsInput, {
    nullable: true
  })
  update?: GradeUpdateWithoutGroupsInput | undefined;
}
