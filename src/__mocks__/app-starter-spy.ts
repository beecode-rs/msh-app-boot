import { vi } from 'vitest'

import { AppFlow, AppStarter, AppStarterStatusMapper } from '#src'

export class AppStarterSpy extends AppStarter {
	get getFlow(): AppFlow {
		return this._flow
	}

	get getStatus(): AppStarterStatusMapper {
		return this._status
	}

	set setStatus(status: AppStarterStatusMapper) {
		this._status = status
	}

	registerOnExitSpy = vi.fn().mockImplementation(super._registerOnExit)
	protected _registerOnExit(): void {
		return this.registerOnExitSpy()
	}

	gracefulStopSpy = vi.fn().mockImplementation(super._gracefulStop)
	protected async _gracefulStop(): Promise<void> {
		return this.gracefulStopSpy()
	}

	onErrorSpy = vi.fn<[Error]>().mockImplementation(super._onError)
	protected async _onError(err: Error): Promise<void> {
		return this.onErrorSpy(err)
	}
}
