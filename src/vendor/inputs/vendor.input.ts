import { Field, InputType } from "@nestjs/graphql";

@InputType()
class Company {
	@Field()
	uen: string;

	@Field()
	name: string;
}

@InputType()
class Applicant {
	@Field()
	name: string;

	@Field()
	companyPosition: string;

	@Field()
	email: string;

	@Field()
	mobile: string;
}

@InputType()
export default class VendorInput {
	@Field(() => Company)
	company: Company;

	@Field(() => Applicant)
	applicant: Applicant;
}
