import { AppStarter } from '@beecode/msh-app-boot/app-starter.js'
import { setAppBootLogger } from '@beecode/msh-app-boot/util/logger.js'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/logger-strategy/console.js'

import { App } from '#/basic-example/app'

setAppBootLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))

new AppStarter(new App()).start().catch((err) => console.log(err)) // eslint-disable-line no-console
