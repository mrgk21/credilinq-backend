import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
// import * as fs from "node:fs/promises";
import { VendorService } from "./vendor.service";

@Controller("vendor")
export class VendorController {
	constructor(private vendorService: VendorService) {}

	@Post("upload")
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: "doc-1" },
			{ name: "doc-2" },
			{ name: "doc-3" },
			{ name: "doc-4" },
			{ name: "doc-5" },
			{ name: "doc-6" },
		]),
	)
	uploadFile(
		@UploadedFiles()
		files: { docs: Express.Multer.File[] },
		@Body("email") email: string,
	) {
		console.log(files, email);

		return this.vendorService.uploadFiles(email, files);
	}
}
