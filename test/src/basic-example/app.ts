import { AppFlow } from '@beecode/msh-app-boot/dist/app-flow'
import { FirstInitiable } from 'src/basic-example/initiate/first-initiable'
import { SecondInitiable } from 'src/basic-example/initiate/second-initiable'
import { ThirdInitiable } from 'src/basic-example/initiate/third-initiable'

export class App extends AppFlow {
	constructor() {
		super(new FirstInitiable(), [new SecondInitiable(), new ThirdInitiable()])
	}
}
