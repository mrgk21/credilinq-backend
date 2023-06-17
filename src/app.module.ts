import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { VendorModule } from "./vendor/vendor.module";
import { LoggerMiddleware } from "./_common/middleware/logger.middleware";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(process.env.MONGO_URL),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: "schema.gql",
			playground: true,
		}),
		VendorModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
	}
}
