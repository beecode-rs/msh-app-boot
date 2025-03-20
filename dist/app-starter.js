import { logger } from '#src/util/logger';
export var AppStarterStatusMapper;
(function (AppStarterStatusMapper) {
    AppStarterStatusMapper["STARTED"] = "started";
    AppStarterStatusMapper["STOPPED"] = "stopped";
})(AppStarterStatusMapper || (AppStarterStatusMapper = {}));
export class AppStarter {
    _flow;
    _status = AppStarterStatusMapper.STOPPED;
    constructor(appFlow) {
        this._flow = appFlow;
    }
    async start() {
        try {
            if (this._status === AppStarterStatusMapper.STARTED) {
                logger().warn('App already started');
                return;
            }
            this._status = AppStarterStatusMapper.STARTED;
            await this._flow.create();
            this._registerOnExit();
        }
        catch (err) {
            await this._onError(err);
        }
    }
    _registerOnExit() {
        ;
        ['SIGTERM', 'SIGINT'].forEach((signal) => {
            process.on(signal, () => {
                this._gracefulStop().catch((err) => logger().error(err));
            });
        });
    }
    async _gracefulStop() {
        await this.stop();
        process.exit(0);
    }
    async _onError(err) {
        logger().error(err.message);
        await this.stop();
        process.exit(1);
    }
    async stop() {
        if (this._status === AppStarterStatusMapper.STOPPED) {
            logger().warn('App already stopped');
            return;
        }
        this._status = AppStarterStatusMapper.STOPPED;
        await this._flow.destroy();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN0YXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLXN0YXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXpDLE1BQU0sQ0FBTixJQUFZLHNCQUdYO0FBSEQsV0FBWSxzQkFBc0I7SUFDakMsNkNBQW1CLENBQUE7SUFDbkIsNkNBQW1CLENBQUE7QUFDcEIsQ0FBQyxFQUhXLHNCQUFzQixLQUF0QixzQkFBc0IsUUFHakM7QUFFRCxNQUFNLE9BQU8sVUFBVTtJQUNaLEtBQUssQ0FBUztJQUNkLE9BQU8sR0FBMkIsc0JBQXNCLENBQUMsT0FBTyxDQUFBO0lBRTFFLFlBQVksT0FBZ0I7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDO1lBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtnQkFFcEMsT0FBTTtZQUNQLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDLE9BQU8sQ0FBQTtZQUM3QyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3ZCLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQVksQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBRVMsZUFBZTtRQUN4QixDQUFDO1FBQUEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN6RCxDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhO1FBQzVCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUVTLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBVTtRQUNsQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzNCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JELE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBRXBDLE9BQU07UUFDUCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUE7UUFDN0MsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzNCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgQXBwRmxvdyB9IGZyb20gJyNzcmMvYXBwLWZsb3cnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcjc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgZW51bSBBcHBTdGFydGVyU3RhdHVzTWFwcGVyIHtcblx0U1RBUlRFRCA9ICdzdGFydGVkJyxcblx0U1RPUFBFRCA9ICdzdG9wcGVkJyxcbn1cblxuZXhwb3J0IGNsYXNzIEFwcFN0YXJ0ZXIge1xuXHRwcm90ZWN0ZWQgX2Zsb3c6IEFwcEZsb3dcblx0cHJvdGVjdGVkIF9zdGF0dXM6IEFwcFN0YXJ0ZXJTdGF0dXNNYXBwZXIgPSBBcHBTdGFydGVyU3RhdHVzTWFwcGVyLlNUT1BQRURcblxuXHRjb25zdHJ1Y3RvcihhcHBGbG93OiBBcHBGbG93KSB7XG5cdFx0dGhpcy5fZmxvdyA9IGFwcEZsb3dcblx0fVxuXG5cdGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAodGhpcy5fc3RhdHVzID09PSBBcHBTdGFydGVyU3RhdHVzTWFwcGVyLlNUQVJURUQpIHtcblx0XHRcdFx0bG9nZ2VyKCkud2FybignQXBwIGFscmVhZHkgc3RhcnRlZCcpXG5cblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9zdGF0dXMgPSBBcHBTdGFydGVyU3RhdHVzTWFwcGVyLlNUQVJURURcblx0XHRcdGF3YWl0IHRoaXMuX2Zsb3cuY3JlYXRlKClcblx0XHRcdHRoaXMuX3JlZ2lzdGVyT25FeGl0KClcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdGF3YWl0IHRoaXMuX29uRXJyb3IoZXJyIGFzIEVycm9yKVxuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfcmVnaXN0ZXJPbkV4aXQoKTogdm9pZCB7XG5cdFx0O1snU0lHVEVSTScsICdTSUdJTlQnXS5mb3JFYWNoKChzaWduYWw6IHN0cmluZykgPT4ge1xuXHRcdFx0cHJvY2Vzcy5vbihzaWduYWwsICgpID0+IHtcblx0XHRcdFx0dGhpcy5fZ3JhY2VmdWxTdG9wKCkuY2F0Y2goKGVycikgPT4gbG9nZ2VyKCkuZXJyb3IoZXJyKSlcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdHByb3RlY3RlZCBhc3luYyBfZ3JhY2VmdWxTdG9wKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMuc3RvcCgpXG5cdFx0cHJvY2Vzcy5leGl0KDApXG5cdH1cblxuXHRwcm90ZWN0ZWQgYXN5bmMgX29uRXJyb3IoZXJyOiBFcnJvcik6IFByb21pc2U8dm9pZD4ge1xuXHRcdGxvZ2dlcigpLmVycm9yKGVyci5tZXNzYWdlKVxuXHRcdGF3YWl0IHRoaXMuc3RvcCgpXG5cdFx0cHJvY2Vzcy5leGl0KDEpXG5cdH1cblxuXHRhc3luYyBzdG9wKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9zdGF0dXMgPT09IEFwcFN0YXJ0ZXJTdGF0dXNNYXBwZXIuU1RPUFBFRCkge1xuXHRcdFx0bG9nZ2VyKCkud2FybignQXBwIGFscmVhZHkgc3RvcHBlZCcpXG5cblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHR0aGlzLl9zdGF0dXMgPSBBcHBTdGFydGVyU3RhdHVzTWFwcGVyLlNUT1BQRURcblx0XHRhd2FpdCB0aGlzLl9mbG93LmRlc3Ryb3koKVxuXHR9XG59XG4iXX0=