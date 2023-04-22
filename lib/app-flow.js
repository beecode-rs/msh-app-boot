"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFlow = exports.FlowDirectionMapper = void 0;
const logger_1 = require("./util/logger");
var FlowDirectionMapper;
(function (FlowDirectionMapper) {
    FlowDirectionMapper["DESTROY"] = "destroy";
    FlowDirectionMapper["CREATE"] = "create";
})(FlowDirectionMapper = exports.FlowDirectionMapper || (exports.FlowDirectionMapper = {}));
class AppFlow {
    constructor(...args) {
        this._flowList = [...args];
    }
    async create() {
        await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.CREATE, flowList: this._flowList });
    }
    async destroy() {
        await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.DESTROY, flowList: this._topLevelReversedFlowList() });
    }
    _topLevelReversedFlowList() {
        return this._flowList.reverse();
    }
    static async DeepExecFlowList(params) {
        try {
            const { flowList, direction } = params;
            // eslint-disable-next-line no-loops/no-loops
            for (const lifeCycle of flowList) {
                if (Array.isArray(lifeCycle)) {
                    await AppFlow.ExecSyncFlowList(lifeCycle, direction);
                }
                else {
                    await lifeCycle[direction]();
                }
            }
        }
        catch (err) {
            if (err instanceof Error) {
                (0, logger_1.logger)().error(err);
            }
            throw err;
        }
    }
    static async ExecSyncFlowList(lifeCycleList, createOrDestroy) {
        await Promise.all(lifeCycleList.map((lifeCycle) => lifeCycle[createOrDestroy]()));
    }
}
exports.AppFlow = AppFlow;
//# sourceMappingURL=app-flow.js.map