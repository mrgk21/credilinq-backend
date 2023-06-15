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
			{ name: "doc-1", maxCount: 1 },
			{ name: "doc-2", maxCount: 1 },
			{ name: "doc-3", maxCount: 1 },
			{ name: "doc-4", maxCount: 1 },
			{ name: "doc-5", maxCount: 1 },
			{ name: "doc-6", maxCount: 1 },
		]),
	)
	uploadFile(
		@UploadedFiles()
		files: { docs: Express.Multer.File[] },
		@Body("id") id: number,
	) {
		console.log(files, id);

		// return this.vendorService.uploadFiles(id, files);
	}
}
