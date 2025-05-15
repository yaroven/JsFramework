import Module from "../yaroven/decorators/Module";
import { AppController } from "./controllers";

@Module({
	imports: [AppController]
})
export class AppModule {}