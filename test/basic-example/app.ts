import { FirstInitiable } from './initiate/first-initiable'
import { SecondInitiable } from './initiate/second-initiable'
import { ThirdInitiable } from './initiate/third-initiable'
import { AppFlow } from '@beecode/msh-app-boot/lib/app-flow'

export class App extends AppFlow {
	constructor() {
		super(new FirstInitiable(), [new SecondInitiable(), new ThirdInitiable()])
	}
}
