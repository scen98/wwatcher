export async function asyncWrapper(callback: ()=>Promise<any>, callbackerr: (err:any)=>void){
    try{
        await callback();
    } catch(error){
        callbackerr(error);
    }
}

export function returnData(res:any, object: any){
    res.status(200);
    res.send(JSON.stringify(object));
    return true;
}

export function return201(res: any, response: string = "201"): boolean{
    res.status(201);
    res.send(JSON.stringify({response: 201}));
    return true;
}

export function returnInsert(res, newId: number | string){
    res.status(201);
    res.send(JSON.stringify({newId: newId}));
    return true;
}

export function return200(res: any, response: string = "200"): boolean{
    res.status(200);
    res.send(JSON.stringify({response: 200}));
    return true;
}

export function return400(res: any, response: string = "400"): boolean{
    res.status(400);
    res.send(JSON.stringify({response: 400}));
    return false;
}

export function returnMissingRequest(res: any, missing: string[]): boolean{
    let missingValues = "";
    missing.forEach(m=> missingValues = `${missingValues} ${m}`);
    res.status(400);
    res.send(JSON.stringify({response: `missing data in request: ${missingValues}`}));
    return false;
}

export function return403(res: any, response: string = "403"): boolean{
    res.status(403);
    res.send(JSON.stringify({ response }));
    return false;
}

export function return500(res: any, response: string = "500"): boolean{
    res.status(500);
    res.send(JSON.stringify({ response }));
    return false;
}

export function return404(res: any, response: string = "404"){
    res.status(404);
    res.send(JSON.stringify({ response }));
    return false;
}

export function returnError(res:any, err: ErrorEvent){
    res.status(500);
    res.send(JSON.stringify({serverError: err.toString()}));
    return false; 
}

export function nullCheckLimit(data: any){
    if(data.limit == null){
        data.limit = 1000000;
    }
    if(data.offset == null){
        data.offset = 0;
    }
}

export interface ILimiter{
    limit: number;
    offset: number;
}

export function getLimiter(limit: number, offset: number): ILimiter{
    const limiter: ILimiter = { limit: 100000, offset: 0 }
    if(limit > 0){
        limiter.limit = limit;
    }
    if(offset >= 0){
        limiter.offset = offset;
    }
    return limiter;
}

export function isImage(file: any){
    return !(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg");
}

export function validateProperties(res, objectToCheck: any, toCheck: string[]): boolean{ //accepts null btw
    const found: string[] = [];
    for(let propName of toCheck) {
        if(objectToCheck[propName] === undefined) found.push(propName);
    }
    if(found.length > 0){
        returnMissingRequest(res, found);
        return false;
    }
    return true;
}

export const isUserMod = (req)=>{
    if(req.session == null) return false;
    if(req.session.user == null) return false;
    if(req.session.user.permission != null && req.session.user.permission > 1) return true;
    return false;
}

export const isUserAdmin = (req)=>{
    if(req.session == null) return false;
    if(req.session.user == null) return false;
    if(req.session.user.permission != null && req.session.user.permission > 2) return true;
    return false;
}

export const isUserLogged = (req)=>{
    if(req.session == null) return false;
    if(req.session.user == null) return false;
    if(req.session.user.permission != null && req.session.user.permission > 0) return true;
    return false;
}

export const checkLength = (res, text: string, max: number) => {
    if(text.length > max) {
        return400(res, `String too long, maximum length: ${max}`);
        return false;
    }
    return true;
}