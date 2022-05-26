import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateManyProfileInput } from "../inputs/AttendanceCreateManyProfileInput";

@TypeGraphQL.InputType("AttendanceCreateManyProfileInputEnvelope", {
  isAbstract: true
})
export class AttendanceCreateManyProfileInputEnvelope {
  @TypeGraphQL.Field(_type => [AttendanceCreateManyProfileInput], {
    nullable: false
  })
  data!: AttendanceCreateManyProfileInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
