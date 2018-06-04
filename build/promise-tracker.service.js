"use strict";
/**
 * @file Service: PromiseTracker
 * @author yumao<yuzhang.lille@gmail.com>
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Inspired by angular-promise-tracker
// Add Observable Subscription
var core_1 = require("@angular/core");
var Subscription_1 = require("rxjs");
var PromiseTrackerService = /** @class */ (function () {
    function PromiseTrackerService() {
        this.promiseList = [];
        this.delayJustFinished = false;
        this.isBusyStarted = false;
        this.onCheckPending = new core_1.EventEmitter();
    }
    PromiseTrackerService.prototype.reset = function (options) {
        var _this = this;
        this.minDuration = options.minDuration;
        this.promiseList = [];
        options.promiseList.forEach(function (promise) {
            if (!promise || promise['busyFulfilled']) {
                return;
            }
            _this.addPromise(promise);
        });
        if (this.promiseList.length === 0) {
            return;
        }
        this.delayJustFinished = false;
        if (options.delay) {
            this.delayPromise = setTimeout(function () {
                _this.delayPromise = null;
                _this.delayJustFinished = true;
                if (_this.promiseList.length === 0) {
                    _this.onCheckPending.emit();
                }
            }, options.delay);
        }
        if (options.minDuration) {
            this.durationPromise = setTimeout(function () {
                _this.durationPromise = null;
                if (_this.promiseList.length === 0) {
                    _this.onCheckPending.emit();
                }
            }, options.minDuration + (options.delay || 0));
        }
    };
    PromiseTrackerService.prototype.addPromise = function (promise) {
        var _this = this;
        if (this.promiseList.indexOf(promise) !== -1) {
            return;
        }
        this.promiseList.push(promise);
        if (promise instanceof Promise) {
            promise.then.call(promise, function () { return _this.finishPromise(promise); }, function () { return _this.finishPromise(promise); });
        }
        else if (promise instanceof Subscription_1.Subscription) {
            promise.add(function () { return _this.finishPromise(promise); });
        }
    };
    PromiseTrackerService.prototype.finishPromise = function (promise) {
        promise['busyFulfilled'] = true;
        var index = this.promiseList.indexOf(promise);
        if (index === -1) {
            return;
        }
        this.promiseList.splice(index, 1);
        if (!this.durationPromise) {
            this.onCheckPending.emit();
        }
    };
    PromiseTrackerService.prototype.isActive = function () {
        var result;
        if (this.delayPromise) {
            result = false;
        }
        else {
            if (!this.delayJustFinished) {
                if (this.durationPromise) {
                    result = true;
                }
                else {
                    result = this.promiseList.length > 0;
                }
            }
            else {
                this.delayJustFinished = false;
                if (this.promiseList.length === 0) {
                    this.durationPromise = undefined;
                }
                result = this.promiseList.length > 0;
            }
        }
        if (result === false && this.isBusyStarted) {
            this.onStopBusy.emit();
            this.isBusyStarted = false;
        }
        else if (result === true && !this.isBusyStarted) {
            this.onStartBusy.emit();
            this.isBusyStarted = true;
        }
        return result;
    };
    PromiseTrackerService = __decorate([
        core_1.Injectable()
    ], PromiseTrackerService);
    return PromiseTrackerService;
}());
exports.PromiseTrackerService = PromiseTrackerService;
//# sourceMappingURL=promise-tracker.service.js.map