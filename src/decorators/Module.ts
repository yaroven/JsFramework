import { ModuleMetadata } from "../main"
export default function Module(payload: {imports:any[]}){
    return function(target: any){
        ModuleMetadata.set(target, payload)
        console.log(ModuleMetadata)
    }
}