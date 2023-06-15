import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VendorResolver } from "./vendor.resolver";
import { schemaName, VendorSchema } from "./vendor.schema";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";

@Module({
	imports: [MongooseModule.forFeature([{ name: schemaName, schema: VendorSchema }])],
	controllers: [VendorController],
	providers: [VendorService, VendorResolver],
})
export class VendorModule {}
