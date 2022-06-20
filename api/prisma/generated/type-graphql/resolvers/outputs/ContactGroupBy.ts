import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCountAggregate } from "../outputs/ContactCountAggregate";
import { ContactMaxAggregate } from "../outputs/ContactMaxAggregate";
import { ContactMinAggregate } from "../outputs/ContactMinAggregate";

@TypeGraphQL.ObjectType("ContactGroupBy", {
  isAbstract: true
})
export class ContactGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  emailConfirmed!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  phone!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  parentsPhones!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  address!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note!: string | null;

  @TypeGraphQL.Field(_type => ContactCountAggregate, {
    nullable: true
  })
  _count!: ContactCountAggregate | null;

  @TypeGraphQL.Field(_type => ContactMinAggregate, {
    nullable: true
  })
  _min!: ContactMinAggregate | null;

  @TypeGraphQL.Field(_type => ContactMaxAggregate, {
    nullable: true
  })
  _max!: ContactMaxAggregate | null;
}
