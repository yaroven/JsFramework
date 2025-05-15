export const ModuleMetadata = new Map()

export default function Module(payload: {imports:any[]}){
    return function(target: any){
        ModuleMetadata.set(target, payload)
    }
}