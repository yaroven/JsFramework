import { AppModule } from "./app/AppModule";
import YarovenFactory from "./yaroven/core/YarovenFactory";

const app = YarovenFactory.create(AppModule);
app.listen(3000);
