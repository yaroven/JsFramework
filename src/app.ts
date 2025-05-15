import { AppModule } from "./app/AppModule";
import YarovenFactory from "./yaroven/YarovenFactory";

const app = YarovenFactory.create(AppModule);
app.listen(3000, "localhost")