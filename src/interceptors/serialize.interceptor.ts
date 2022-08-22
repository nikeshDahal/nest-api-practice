import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Next
}from '@nestjs/common'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';

interface ClassConstructor {
    new (...args : any[] ):{};
}

export function serialize(dto:ClassConstructor){
    return UseInterceptors(new SeralizeInterceptor(dto))
}

export class SeralizeInterceptor implements NestInterceptor{
    constructor(private dto : any){}
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any>{
        return handler.handle().pipe(
            map((data:any)=>{
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues : true
                })
            })
        )
        
    }

}