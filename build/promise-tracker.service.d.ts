/**
 * @file Service: PromiseTracker
 * @author yumao<yuzhang.lille@gmail.com>
 */
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
export declare class PromiseTrackerService {
    promiseList: Array<Promise<any> | Subscription>;
    delayPromise: number | any;
    durationPromise: number | any;
    delayJustFinished: boolean;
    minDuration: number;
    private isBusyStarted;
    onStartBusy: EventEmitter<any>;
    onStopBusy: EventEmitter<any>;
    onCheckPending: EventEmitter<{}>;
    reset(options: IPromiseTrackerOptions): void;
    private addPromise(promise);
    private finishPromise(promise);
    isActive(): any;
}
export interface IPromiseTrackerOptions {
    minDuration: number;
    delay: number;
    promiseList: Promise<any>[];
}
