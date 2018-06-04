"use strict";
/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var promise_tracker_service_1 = require("./promise-tracker.service");
var Subscription_1 = require("rxjs");
var inactiveStyle = animations_1.style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
var timing = '.3s ease';
;
var BusyComponent = /** @class */ (function () {
    function BusyComponent(tracker, cdr
        //,private compiler: Compiler
    ) {
        var _this = this;
        this.tracker = tracker;
        this.cdr = cdr;
        this.sub = new Subscription_1.Subscription();
        this.sub.add(this.tracker.onCheckPending.subscribe(function () {
            _this.cdr.markForCheck();
        }));
    }
    BusyComponent.prototype.ngDoCheck = function () {
        if (this.message === this.lastMessage) {
            return;
        }
        this.lastMessage = this.message;
        //this.clearDynamicTemplateCache();
        //this.createDynamicTemplate();
    };
    BusyComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        //this.clearDynamicTemplateCache();
    };
    // createDynamicTemplate() {
    //     const {template, message} = this;
    //     @Component({template})
    //     class TemplateComponent {
    //         message: string = message;
    //     }
    //     @NgModule({
    //         declarations: [TemplateComponent],
    //         entryComponents: [TemplateComponent]
    //     })
    //     class TemplateModule {}
    //     this.TemplateComponent = TemplateComponent;
    //     this.nmf = this.compiler.compileModuleSync(TemplateModule);
    // }
    // clearDynamicTemplateCache() {
    //     if (!this.nmf) {
    //         return;
    //     }
    //     this.compiler.clearCacheFor(this.nmf.moduleType);
    //     this.nmf = null;
    // }
    BusyComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    BusyComponent = __decorate([
        core_1.Component({
            selector: 'ng-busy',
            template: "\n        <div [class]=\"wrapperClass\" *ngIf=\"isActive()\" @flyInOut>\n            <!-- <ng-container *ngComponentOutlet=\"TemplateComponent; ngModuleFactory: nmf;\"></ng-container> -->\n            <div class=\"ng-busy-default-wrapper\">\n                <div class=\"ng-busy-default-sign\">\n                    <div class=\"ng-busy-default-spinner\">\n                        <div class=\"bar1\"></div>\n                        <div class=\"bar2\"></div>\n                        <div class=\"bar3\"></div>\n                        <div class=\"bar4\"></div>\n                        <div class=\"bar5\"></div>\n                        <div class=\"bar6\"></div>\n                        <div class=\"bar7\"></div>\n                        <div class=\"bar8\"></div>\n                        <div class=\"bar9\"></div>\n                        <div class=\"bar10\"></div>\n                        <div class=\"bar11\"></div>\n                        <div class=\"bar12\"></div>\n                    </div>\n                    <div class=\"ng-busy-default-text\">{{message}}</div>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('flyInOut', [
                    animations_1.transition('void => *', [
                        inactiveStyle,
                        animations_1.animate(timing)
                    ]),
                    animations_1.transition('* => void', [
                        animations_1.animate(timing, inactiveStyle)
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [promise_tracker_service_1.PromiseTrackerService,
            core_1.ChangeDetectorRef
            //,private compiler: Compiler
        ])
    ], BusyComponent);
    return BusyComponent;
}());
exports.BusyComponent = BusyComponent;
//# sourceMappingURL=busy.component.js.map