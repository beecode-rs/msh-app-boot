import { logger } from '#src/util/logger'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class LifeCycle<T = any> {
	protected abstract _createFn(): Promise<T>
	protected abstract _destroyFn(): Promise<T>

	readonly name: string

	protected constructor(params: { name: string }) {
		const { name } = params
		this.name = name
	}

	async create(): Promise<T> {
		logger().debug(`${this.name} Create START`)
		const result = await this._createFn()
		logger().debug(`${this.name} Create END`)

		return result
	}

	async destroy(): Promise<T> {
		logger().debug(`${this.name} Destroy START`)
		const result = await this._destroyFn()
		logger().debug(`${this.name} Destroy END`)

		return result
	}
}
