/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
import { DoCheck, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';
import { Subscription } from 'rxjs';
export interface IBusyContext {
    message: string;
}
export declare class BusyComponent implements DoCheck, OnDestroy {
    private tracker;
    private readonly cdr;
    TemplateComponent: any;
    private nmf;
    wrapperClass: string;
    template: string;
    message: string;
    private lastMessage;
    sub: Subscription;
    constructor(tracker: PromiseTrackerService, cdr: ChangeDetectorRef);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    isActive(): any;
}
