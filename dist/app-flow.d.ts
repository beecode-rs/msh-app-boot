import { type LifeCycle } from '#src/life-cycle';
export type FlowList = (LifeCycle | LifeCycle[])[];
export declare enum FlowDirectionMapper {
    DESTROY = "destroy",
    CREATE = "create"
}
export declare abstract class AppFlow {
    protected readonly _flowList: FlowList;
    protected constructor(...args: FlowList);
    create(): Promise<void>;
    destroy(): Promise<void>;
    protected _topLevelReversedFlowList(): FlowList;
    static DeepExecFlowList(params: {
        flowList: FlowList;
        direction: FlowDirectionMapper;
    }): Promise<void>;
    static ExecSyncFlowList(lifeCycleList: LifeCycle[], createOrDestroy: FlowDirectionMapper): Promise<void>;
}
//# sourceMappingURL=app-flow.d.ts.map