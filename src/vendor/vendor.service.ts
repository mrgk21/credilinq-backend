import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Express } from "express";
import * as fs from "node:fs/promises";
import { IVendor, schemaName, VendorDocument } from "./vendor.schema";

@Injectable()
export class VendorService {
	constructor(@InjectModel(schemaName) private vendorModel: Model<VendorDocument>) {}

	getVendor(email: string) {
		return this.vendorModel.findOne({ "applicant.email": email });
	}

	createVendor(vendor: IVendor) {
		return this.vendorModel.create(vendor);
	}

	async uploadFiles(
		email: string,
		files: { [k: string]: Express.Multer.File[] },
	): Promise<boolean> {
		Object.keys(files).forEach((name) => {
			if (files[name][0].mimetype !== "application/pdf")
				throw new BadRequestException("Wrong file type detected");
		});

		const filePromises = Object.keys(files).map(async (name) =>
			this.vendorModel.updateOne(
				{ "applicant.email": email },
				{
					$push: {
						documents: {
							name: files[name][0].originalname,
							content: files[name][0].buffer,
						},
					},
				},
			),
		);
		await Promise.all(filePromises);
		await this.vendorModel.updateOne({ "applicant.email": email }, { status: "complete" });
		return true;
	}

	async generatePDFs(email: string) {
		const user = await this.vendorModel.findOne({ "applicant.email": email });
		const filePromises = user.documents.map((doc) =>
			fs.writeFile(`./files/${user.applicant.email}/${doc.name}.pdf`, doc.content, {}),
		);
		await fs.mkdir(`./files/${user.applicant.email}`, { recursive: true });
		await Promise.all(filePromises);
		return true;
	}
}

// try {
// 	await fs.writeFile("./cat.pdf", doc[0].buffer, {});
// 	await fs.writeFile("./hello.json", hello[0].buffer, {});
// 	console.log("done!");
// } catch (error) {
// 	console.log(error);
// }
