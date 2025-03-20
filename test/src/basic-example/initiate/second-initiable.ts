import { LifeCycle } from '@beecode/msh-app-boot/life-cycle'

export class SecondInitiable extends LifeCycle {
	constructor() {
		super({ name: 'Second initiable' })
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	protected async _createFn(): Promise<any> {
		console.log('%%%%%% Second create') // eslint-disable-line no-console
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	protected async _destroyFn(): Promise<any> {
		console.log('%%%%%% Second destroy') // eslint-disable-line no-console
	}
}
