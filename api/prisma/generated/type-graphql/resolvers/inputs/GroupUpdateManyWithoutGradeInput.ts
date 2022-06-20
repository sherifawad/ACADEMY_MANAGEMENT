import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateManyGradeInputEnvelope } from "../inputs/GroupCreateManyGradeInputEnvelope";
import { GroupCreateOrConnectWithoutGradeInput } from "../inputs/GroupCreateOrConnectWithoutGradeInput";
import { GroupCreateWithoutGradeInput } from "../inputs/GroupCreateWithoutGradeInput";
import { GroupScalarWhereInput } from "../inputs/GroupScalarWhereInput";
import { GroupUpdateManyWithWhereWithoutGradeInput } from "../inputs/GroupUpdateManyWithWhereWithoutGradeInput";
import { GroupUpdateWithWhereUniqueWithoutGradeInput } from "../inputs/GroupUpdateWithWhereUniqueWithoutGradeInput";
import { GroupUpsertWithWhereUniqueWithoutGradeInput } from "../inputs/GroupUpsertWithWhereUniqueWithoutGradeInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupUpdateManyWithoutGradeInput", {
  isAbstract: true
})
export class GroupUpdateManyWithoutGradeInput {
  @TypeGraphQL.Field(_type => [GroupCreateWithoutGradeInput], {
    nullable: true
  })
  create?: GroupCreateWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupCreateOrConnectWithoutGradeInput], {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupUpsertWithWhereUniqueWithoutGradeInput], {
    nullable: true
  })
  upsert?: GroupUpsertWithWhereUniqueWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => GroupCreateManyGradeInputEnvelope, {
    nullable: true
  })
  createMany?: GroupCreateManyGradeInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereUniqueInput], {
    nullable: true
  })
  set?: GroupWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereUniqueInput], {
    nullable: true
  })
  disconnect?: GroupWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereUniqueInput], {
    nullable: true
  })
  delete?: GroupWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereUniqueInput], {
    nullable: true
  })
  connect?: GroupWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupUpdateWithWhereUniqueWithoutGradeInput], {
    nullable: true
  })
  update?: GroupUpdateWithWhereUniqueWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupUpdateManyWithWhereWithoutGradeInput], {
    nullable: true
  })
  updateMany?: GroupUpdateManyWithWhereWithoutGradeInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupScalarWhereInput], {
    nullable: true
  })
  deleteMany?: GroupScalarWhereInput[] | undefined;
}
