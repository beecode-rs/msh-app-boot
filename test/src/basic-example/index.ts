import { AppStarter } from '@beecode/msh-app-boot/dist/app-starter'
import { setAppBootLogger } from '@beecode/msh-app-boot/dist/util/logger'
import { LogLevel } from '@beecode/msh-logger'
import { LoggerStrategyConsole } from '@beecode/msh-logger/dist/logger-strategy/console'
import { App } from 'src/basic-example/app'

setAppBootLogger(new LoggerStrategyConsole({ logLevel: LogLevel.DEBUG }))

new AppStarter(new App()).start().catch((err) => console.log(err)) // eslint-disable-line no-console
