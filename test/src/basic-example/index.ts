import { AppStarter } from '@beecode/msh-app-boot/app-starter'
import { setAppBootLogger } from '@beecode/msh-app-boot/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console'
import { App } from 'src/basic-example/app'

setAppBootLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))

new AppStarter(new App()).start().catch((err: unknown) => {
	if (err instanceof Error) {
		console.log(err.message) // eslint-disable-line no-console

		return
	}
	console.log(err) // eslint-disable-line no-console
})
