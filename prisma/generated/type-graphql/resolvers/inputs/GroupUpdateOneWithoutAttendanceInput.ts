import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCreateOrConnectWithoutAttendanceInput } from "../inputs/GroupCreateOrConnectWithoutAttendanceInput";
import { GroupCreateWithoutAttendanceInput } from "../inputs/GroupCreateWithoutAttendanceInput";
import { GroupUpdateWithoutAttendanceInput } from "../inputs/GroupUpdateWithoutAttendanceInput";
import { GroupUpsertWithoutAttendanceInput } from "../inputs/GroupUpsertWithoutAttendanceInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType("GroupUpdateOneWithoutAttendanceInput", {
  isAbstract: true
})
export class GroupUpdateOneWithoutAttendanceInput {
  @TypeGraphQL.Field(_type => GroupCreateWithoutAttendanceInput, {
    nullable: true
  })
  create?: GroupCreateWithoutAttendanceInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateOrConnectWithoutAttendanceInput, {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutAttendanceInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpsertWithoutAttendanceInput, {
    nullable: true
  })
  upsert?: GroupUpsertWithoutAttendanceInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  connect?: GroupWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateWithoutAttendanceInput, {
    nullable: true
  })
  update?: GroupUpdateWithoutAttendanceInput | undefined;
}
