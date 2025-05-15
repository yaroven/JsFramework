import "reflect-metadata";
import Controller from "../../yaroven/decorators/Controller";
import Get from "../../yaroven/decorators/GetDecorator";
import Injectable from "../../yaroven/decorators/Injectable";

@Injectable()
class LoggerService {
	log(msg: string) {
		console.log("[Logger]:", msg);
	}
}

@Injectable()
class UserService {
	constructor(private logger: LoggerService) { }

	getUser() {
		this.logger.log("Fetching user...");
		return { id: 1, name: "Alice" };
	}
}
@Injectable()
@Controller()
export class AppController {
	constructor(private userService: UserService) { }
	@Get("/hui")
	run(req: any, res: any) {
		const user = this.userService.getUser();
		res.end("Hui")
	}
	@Get("/work")
	run2(req: any, res: any) {
		res.end("WORK")
	}
}



