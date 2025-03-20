import { LifeCycle } from '@beecode/msh-app-boot/life-cycle'

export class FirstInitiable extends LifeCycle {
	constructor() {
		super({ name: 'First initiable' })
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	protected async _createFn(): Promise<any> {
		console.log('%%%%%% First create') // eslint-disable-line no-console
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	protected async _destroyFn(): Promise<any> {
		console.log('%%%%%% First destroy') // eslint-disable-line no-console
	}
}
