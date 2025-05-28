import "reflect-metadata";
import Controller from "../../yaroven/decorators/Controller";
import Get from "../../yaroven/decorators/Get";
import Post from "../../yaroven/decorators/Post";
import Put from "../../yaroven/decorators/Put";
import Body from "../../yaroven/decorators/parameters/Body";
import RawBody from "../../yaroven/decorators/parameters/RawBody";

class LoggerService {
	log(msg: string) {
		console.log("[Logger]:", msg);
	}
}

class UserService {
	constructor(private logger: LoggerService) { }

	getUser() {
		this.logger.log("Fetching user...");
		return { id: 1, name: "Alice" };
	}
}
@Controller()
export class AppController {
	constructor(private userService: UserService) { }
	@Get("/hui")
	run() {
		return "Hui"
	}
	@Post("/work")
	run2(@Body() body:any, @RawBody() RawBody:any) {
		console.log("rawBody: ", RawBody)
		console.log("body: ", body)

		return body
	}
}