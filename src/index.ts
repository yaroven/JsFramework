// main.ts
import "reflect-metadata";
import Injectable from "./decorators/Injectable";
import Module from "./decorators/Module";
import YarovenFactory from "./YarovenFactory";

@Injectable()
class LoggerService {
	log(msg: string) {
		console.log("[Logger]:", msg);
	}
}

@Injectable()
class UserService {
	constructor(private logger: LoggerService) {}

	getUser() {
		this.logger.log("Fetching user...");
		return { id: 1, name: "Alice" };
	}
}
@Injectable()
class AppController {
	constructor(private userService: UserService) {}

	run() {
		const user = this.userService.getUser();
		console.log("User:", user);
	}
}
// const app = Container.resolve(AppController)
// app.run()

@Module({
    imports:[AppController]
})
class AppModule{
    constructor(private appController:AppController){

    }
    run(){
        this.appController.run()
    }
}

const factory = new YarovenFactory();
const app = factory.create(AppModule);

const appModule = app.getController(AppController).run()