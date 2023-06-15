import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class _Company {
	@Field()
	uen: string;

	@Field()
	name: string;
}

@ObjectType()
class _Applicant {
	@Field()
	name: string;

	@Field()
	companyPosition: string;

	@Field()
	email: string;

	@Field()
	mobile: string;
}

@ObjectType()
export default class VendorDto {
	@Field(() => _Company)
	company: _Company;

	@Field(() => _Applicant)
	applicant: _Applicant;
}
