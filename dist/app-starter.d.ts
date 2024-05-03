import { AppFlow } from '#src/app-flow';
export declare enum AppStarterStatusMapper {
    STARTED = "started",
    STOPPED = "stopped"
}
export declare class AppStarter {
    protected _flow: AppFlow;
    protected _status: AppStarterStatusMapper;
    constructor(appFlow: AppFlow);
    start(): Promise<void>;
    protected _registerOnExit(): void;
    protected _gracefulStop(): Promise<void>;
    protected _onError(err: Error): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=app-starter.d.ts.map