import { logger } from './util/logger.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN0YXJ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLXN0YXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXpDLE1BQU0sQ0FBTixJQUFZLHNCQUdYO0FBSEQsV0FBWSxzQkFBc0I7SUFDakMsNkNBQW1CLENBQUE7SUFDbkIsNkNBQW1CLENBQUE7QUFDcEIsQ0FBQyxFQUhXLHNCQUFzQixLQUF0QixzQkFBc0IsUUFHakM7QUFFRCxNQUFNLE9BQU8sVUFBVTtJQUNaLEtBQUssQ0FBUztJQUNkLE9BQU8sR0FBMkIsc0JBQXNCLENBQUMsT0FBTyxDQUFBO0lBRTFFLFlBQVksT0FBZ0I7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDO1lBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtnQkFFcEMsT0FBTTtZQUNQLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDLE9BQU8sQ0FBQTtZQUM3QyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3ZCLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQVksQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDRixDQUFDO0lBRVMsZUFBZTtRQUN4QixDQUFDO1FBQUEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN6RCxDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhO1FBQzVCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUVTLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBVTtRQUNsQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzNCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JELE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBRXBDLE9BQU07UUFDUCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUE7UUFDN0MsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzNCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcEZsb3cgfSBmcm9tICcjc3JjL2FwcC1mbG93J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnI3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGVudW0gQXBwU3RhcnRlclN0YXR1c01hcHBlciB7XG5cdFNUQVJURUQgPSAnc3RhcnRlZCcsXG5cdFNUT1BQRUQgPSAnc3RvcHBlZCcsXG59XG5cbmV4cG9ydCBjbGFzcyBBcHBTdGFydGVyIHtcblx0cHJvdGVjdGVkIF9mbG93OiBBcHBGbG93XG5cdHByb3RlY3RlZCBfc3RhdHVzOiBBcHBTdGFydGVyU3RhdHVzTWFwcGVyID0gQXBwU3RhcnRlclN0YXR1c01hcHBlci5TVE9QUEVEXG5cblx0Y29uc3RydWN0b3IoYXBwRmxvdzogQXBwRmxvdykge1xuXHRcdHRoaXMuX2Zsb3cgPSBhcHBGbG93XG5cdH1cblxuXHRhc3luYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHRoaXMuX3N0YXR1cyA9PT0gQXBwU3RhcnRlclN0YXR1c01hcHBlci5TVEFSVEVEKSB7XG5cdFx0XHRcdGxvZ2dlcigpLndhcm4oJ0FwcCBhbHJlYWR5IHN0YXJ0ZWQnKVxuXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fc3RhdHVzID0gQXBwU3RhcnRlclN0YXR1c01hcHBlci5TVEFSVEVEXG5cdFx0XHRhd2FpdCB0aGlzLl9mbG93LmNyZWF0ZSgpXG5cdFx0XHR0aGlzLl9yZWdpc3Rlck9uRXhpdCgpXG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRhd2FpdCB0aGlzLl9vbkVycm9yKGVyciBhcyBFcnJvcilcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3JlZ2lzdGVyT25FeGl0KCk6IHZvaWQge1xuXHRcdDtbJ1NJR1RFUk0nLCAnU0lHSU5UJ10uZm9yRWFjaCgoc2lnbmFsOiBzdHJpbmcpID0+IHtcblx0XHRcdHByb2Nlc3Mub24oc2lnbmFsLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX2dyYWNlZnVsU3RvcCgpLmNhdGNoKChlcnIpID0+IGxvZ2dlcigpLmVycm9yKGVycikpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRwcm90ZWN0ZWQgYXN5bmMgX2dyYWNlZnVsU3RvcCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRhd2FpdCB0aGlzLnN0b3AoKVxuXHRcdHByb2Nlc3MuZXhpdCgwKVxuXHR9XG5cblx0cHJvdGVjdGVkIGFzeW5jIF9vbkVycm9yKGVycjogRXJyb3IpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRsb2dnZXIoKS5lcnJvcihlcnIubWVzc2FnZSlcblx0XHRhd2FpdCB0aGlzLnN0b3AoKVxuXHRcdHByb2Nlc3MuZXhpdCgxKVxuXHR9XG5cblx0YXN5bmMgc3RvcCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5fc3RhdHVzID09PSBBcHBTdGFydGVyU3RhdHVzTWFwcGVyLlNUT1BQRUQpIHtcblx0XHRcdGxvZ2dlcigpLndhcm4oJ0FwcCBhbHJlYWR5IHN0b3BwZWQnKVxuXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0dGhpcy5fc3RhdHVzID0gQXBwU3RhcnRlclN0YXR1c01hcHBlci5TVE9QUEVEXG5cdFx0YXdhaXQgdGhpcy5fZmxvdy5kZXN0cm95KClcblx0fVxufVxuIl19