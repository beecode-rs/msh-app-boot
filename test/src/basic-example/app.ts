import { AppFlow } from '@beecode/msh-app-boot/lib/app-flow.js'

import { FirstInitiable } from '#/basic-example/initiate/first-initiable'
import { SecondInitiable } from '#/basic-example/initiate/second-initiable'
import { ThirdInitiable } from '#/basic-example/initiate/third-initiable'

export class App extends AppFlow {
	constructor() {
		super(new FirstInitiable(), [new SecondInitiable(), new ThirdInitiable()])
	}
}
