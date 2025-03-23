import { type AppFlow } from '#src/app-flow'
import { logger } from '#src/util/logger'

export enum AppStarterStatusMapper {
	STARTED = 'started',
	STOPPED = 'stopped',
}

export class AppStarter {
	protected _flow: AppFlow
	protected _status: AppStarterStatusMapper = AppStarterStatusMapper.STOPPED

	constructor(appFlow: AppFlow) {
		this._flow = appFlow
	}

	async start(): Promise<void> {
		try {
			if (this._status === AppStarterStatusMapper.STARTED) {
				logger().warn('App already started')

				return
			}
			this._status = AppStarterStatusMapper.STARTED
			await this._flow.create()
			this._registerOnExit()
		} catch (err) {
			await this._onError(err as Error)
		}
	}

	protected _registerOnExit(): void {
		;['SIGTERM', 'SIGINT'].forEach((signal: string) => {
			process.on(signal, () => {
				this._gracefulStop().catch((err: unknown) => {
					if (err instanceof Error) {
						logger().error(err.message)

						return
					}
					logger().error(err)
				})
			})
		})
	}

	protected async _gracefulStop(): Promise<void> {
		await this.stop()
		process.exit(0)
	}

	protected async _onError(err: Error): Promise<void> {
		logger().error(err.message)
		await this.stop()
		process.exit(1)
	}

	async stop(): Promise<void> {
		if (this._status === AppStarterStatusMapper.STOPPED) {
			logger().warn('App already stopped')

			return
		}
		this._status = AppStarterStatusMapper.STOPPED
		await this._flow.destroy()
	}
}
