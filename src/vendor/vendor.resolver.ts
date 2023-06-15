import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import VendorDto from "./dtos/vendor.dto";
import VendorInput from "./inputs/vendor.input";
import { VendorService } from "./vendor.service";

@Resolver()
export class VendorResolver {
	constructor(private vendorService: VendorService) {}

	@Query(() => VendorDto)
	async getVendor(@Args("email") email: string) {
		const x = await this.vendorService.getVendor(email);
		console.log(x);
		return x;
	}

	@Query(() => Boolean)
	generatePDFs(@Args("email") email: string) {
		return this.vendorService.generatePDFs(email);
	}

	@Mutation(() => VendorDto)
	createVendor(@Args("vendor") vendor: VendorInput) {
		return this.vendorService.createVendor(vendor);
	}
}
