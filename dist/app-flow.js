import { logger } from './util/logger.js';
export var FlowDirectionMapper;
(function (FlowDirectionMapper) {
    FlowDirectionMapper["DESTROY"] = "destroy";
    FlowDirectionMapper["CREATE"] = "create";
})(FlowDirectionMapper || (FlowDirectionMapper = {}));
export class AppFlow {
    _flowList;
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
                logger().error(err);
            }
            throw err;
        }
    }
    static async ExecSyncFlowList(lifeCycleList, createOrDestroy) {
        await Promise.all(lifeCycleList.map((lifeCycle) => lifeCycle[createOrDestroy]()));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWZsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLWZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBSXpDLE1BQU0sQ0FBTixJQUFZLG1CQUdYO0FBSEQsV0FBWSxtQkFBbUI7SUFDOUIsMENBQW1CLENBQUE7SUFDbkIsd0NBQWlCLENBQUE7QUFDbEIsQ0FBQyxFQUhXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFHOUI7QUFFRCxNQUFNLE9BQWdCLE9BQU87SUFDVCxTQUFTLENBQVU7SUFFdEMsWUFBc0IsR0FBRyxJQUFjO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNYLE1BQU0sT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDcEcsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1osTUFBTSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDdkgsQ0FBQztJQUVTLHlCQUF5QjtRQUNsQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBOEQ7UUFDM0YsSUFBSSxDQUFDO1lBQ0osTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUE7WUFDdEMsNkNBQTZDO1lBQzdDLEtBQUssTUFBTSxTQUFTLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUM5QixNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7Z0JBQ3JELENBQUM7cUJBQU0sQ0FBQztvQkFDUCxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO2dCQUM3QixDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNwQixDQUFDO1lBQ0QsTUFBTSxHQUFHLENBQUE7UUFDVixDQUFDO0lBQ0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsYUFBMEIsRUFBRSxlQUFvQztRQUM3RixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM3RixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaWZlQ3ljbGUgfSBmcm9tICcjc3JjL2xpZmUtY3ljbGUnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcjc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgdHlwZSBGbG93TGlzdCA9IChMaWZlQ3ljbGUgfCBMaWZlQ3ljbGVbXSlbXVxuXG5leHBvcnQgZW51bSBGbG93RGlyZWN0aW9uTWFwcGVyIHtcblx0REVTVFJPWSA9ICdkZXN0cm95Jyxcblx0Q1JFQVRFID0gJ2NyZWF0ZScsXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcHBGbG93IHtcblx0cHJvdGVjdGVkIHJlYWRvbmx5IF9mbG93TGlzdDogRmxvd0xpc3RcblxuXHRwcm90ZWN0ZWQgY29uc3RydWN0b3IoLi4uYXJnczogRmxvd0xpc3QpIHtcblx0XHR0aGlzLl9mbG93TGlzdCA9IFsuLi5hcmdzXVxuXHR9XG5cblx0YXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IEFwcEZsb3cuRGVlcEV4ZWNGbG93TGlzdCh7IGRpcmVjdGlvbjogRmxvd0RpcmVjdGlvbk1hcHBlci5DUkVBVEUsIGZsb3dMaXN0OiB0aGlzLl9mbG93TGlzdCB9KVxuXHR9XG5cblx0YXN5bmMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRhd2FpdCBBcHBGbG93LkRlZXBFeGVjRmxvd0xpc3QoeyBkaXJlY3Rpb246IEZsb3dEaXJlY3Rpb25NYXBwZXIuREVTVFJPWSwgZmxvd0xpc3Q6IHRoaXMuX3RvcExldmVsUmV2ZXJzZWRGbG93TGlzdCgpIH0pXG5cdH1cblxuXHRwcm90ZWN0ZWQgX3RvcExldmVsUmV2ZXJzZWRGbG93TGlzdCgpOiBGbG93TGlzdCB7XG5cdFx0cmV0dXJuIHRoaXMuX2Zsb3dMaXN0LnJldmVyc2UoKVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIERlZXBFeGVjRmxvd0xpc3QocGFyYW1zOiB7IGZsb3dMaXN0OiBGbG93TGlzdDsgZGlyZWN0aW9uOiBGbG93RGlyZWN0aW9uTWFwcGVyIH0pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgeyBmbG93TGlzdCwgZGlyZWN0aW9uIH0gPSBwYXJhbXNcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wcy9uby1sb29wc1xuXHRcdFx0Zm9yIChjb25zdCBsaWZlQ3ljbGUgb2YgZmxvd0xpc3QpIHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobGlmZUN5Y2xlKSkge1xuXHRcdFx0XHRcdGF3YWl0IEFwcEZsb3cuRXhlY1N5bmNGbG93TGlzdChsaWZlQ3ljbGUsIGRpcmVjdGlvbilcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhd2FpdCBsaWZlQ3ljbGVbZGlyZWN0aW9uXSgpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0XHRsb2dnZXIoKS5lcnJvcihlcnIpXG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBlcnJcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgRXhlY1N5bmNGbG93TGlzdChsaWZlQ3ljbGVMaXN0OiBMaWZlQ3ljbGVbXSwgY3JlYXRlT3JEZXN0cm95OiBGbG93RGlyZWN0aW9uTWFwcGVyKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0YXdhaXQgUHJvbWlzZS5hbGwobGlmZUN5Y2xlTGlzdC5tYXAoKGxpZmVDeWNsZTogTGlmZUN5Y2xlKSA9PiBsaWZlQ3ljbGVbY3JlYXRlT3JEZXN0cm95XSgpKSlcblx0fVxufVxuIl19