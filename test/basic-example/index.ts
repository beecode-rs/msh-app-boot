import { App } from './app'
import { appStarterFactory } from '@beecode/msh-app-boot/lib/app-starter'
import { NodeAppLogger } from '@beecode/msh-app-boot/lib/util/logger'
import { LogLevelType } from '@beecode/msh-node-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'

NodeAppLogger(new ConsoleLogger({ logLevel: LogLevelType.DEBUG }))

appStarterFactory(App)
	.start()
	.catch((err) => console.log(err)) // eslint-disable-line no-console
