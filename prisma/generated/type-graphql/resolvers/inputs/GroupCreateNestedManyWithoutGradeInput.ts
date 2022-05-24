import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateManyGradeInputEnvelope } from "../inputs/GroupCreateManyGradeInputEnvelope";
import { GroupCreateOrConnectWithoutGradeInput } from "../inputs/GroupCreateOrConnectWithoutGradeInput";
import { GroupCreateWithoutGradeInput } from "../inputs/GroupCreateWithoutGradeInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupCreateNestedManyWithoutGradeInput", {
  isAbstract: true
})
export class GroupCreateNestedManyWithoutGradeInput {
  @TypeGraphQL.Field(_type => [GroupCreateWithoutGradeInput], {
    nullable: true
  })
  create?: GroupCreateWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupCreateOrConnectWithoutGradeInput], {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => GroupCreateManyGradeInputEnvelope, {
    nullable: true
  })
  createMany?: GroupCreateManyGradeInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereUniqueInput], {
    nullable: true
  })
  connect?: GroupWhereUniqueInput[] | undefined;
}
