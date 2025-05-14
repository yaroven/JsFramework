import { INJECTABLES } from "../main";

export default function Injectable(): ClassDecorator {
	return (target: any) => {
        if(!INJECTABLES.has(target))
            INJECTABLES.set(target, target)
	};
}
