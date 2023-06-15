import { HydratedDocument, Schema, Types } from "mongoose";

export interface IVendor {
	company: {
		uen: string;
		name: string;
	};
	applicant: {
		name: string;
		companyPosition: string;
		email: string;
		mobile: string;
	};
	documents?: {
		name: string;
		content: Types.Buffer;
	}[];
	status?: "pending" | "complete";
}

export const schemaName = "Vendor";

export type VendorDocument = HydratedDocument<IVendor>;

export const VendorSchema = new Schema<IVendor>(
	{
		company: {
			uen: { type: String },
			name: { type: String },
		},
		applicant: {
			name: { type: String },
			companyPosition: { type: String },
			email: { type: String, unique: true },
			mobile: { type: String, unique: true },
		},
		documents: [
			{
				name: { type: String, required: true },
				content: { type: Buffer, required: true },
				_id: false,
			},
		],
		status: { type: String, default: "pending" },
	},
	{ timestamps: true },
);
