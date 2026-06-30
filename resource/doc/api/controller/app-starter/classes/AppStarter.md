[**@beecode/msh-app-boot**](../../../README.md)

***

[@beecode/msh-app-boot](../../../README.md) / [controller/app-starter](../README.md) / AppStarter

# Class: AppStarter

Defined in: [controller/app-starter.ts:9](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L9)

## Constructors

### Constructor

> **new AppStarter**(`appFlow`): `AppStarter`

Defined in: [controller/app-starter.ts:13](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L13)

#### Parameters

##### appFlow

[`AppFlow`](../../../business/service/app-flow/classes/AppFlow.md)

#### Returns

`AppStarter`

## Properties

### \_flow

> `protected` **\_flow**: [`AppFlow`](../../../business/service/app-flow/classes/AppFlow.md)

Defined in: [controller/app-starter.ts:10](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L10)

***

### \_status

> `protected` **\_status**: [`AppStarterStatusMapper`](../enumerations/AppStarterStatusMapper.md) = `AppStarterStatusMapper.STOPPED`

Defined in: [controller/app-starter.ts:11](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L11)

## Methods

### \_gracefulStop()

> `protected` **\_gracefulStop**(): `Promise`\<`void`\>

Defined in: [controller/app-starter.ts:47](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L47)

#### Returns

`Promise`\<`void`\>

***

### \_onError()

> `protected` **\_onError**(`err`): `Promise`\<`void`\>

Defined in: [controller/app-starter.ts:52](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L52)

#### Parameters

##### err

`Error`

#### Returns

`Promise`\<`void`\>

***

### \_registerOnExit()

> `protected` **\_registerOnExit**(): `void`

Defined in: [controller/app-starter.ts:32](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L32)

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [controller/app-starter.ts:17](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L17)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [controller/app-starter.ts:58](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/controller/app-starter.ts#L58)

#### Returns

`Promise`\<`void`\>
