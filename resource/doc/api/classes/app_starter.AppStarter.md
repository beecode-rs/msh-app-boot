[@beecode/msh-app-boot](../README.md) / [app-starter](../modules/app_starter.md) / AppStarter

# Class: AppStarter

[app-starter](../modules/app_starter.md).AppStarter

## Table of contents

### Constructors

- [constructor](app_starter.AppStarter.md#constructor)

### Properties

- [\_flow](app_starter.AppStarter.md#_flow)
- [\_status](app_starter.AppStarter.md#_status)

### Methods

- [\_gracefulStop](app_starter.AppStarter.md#_gracefulstop)
- [\_onError](app_starter.AppStarter.md#_onerror)
- [\_registerOnExit](app_starter.AppStarter.md#_registeronexit)
- [start](app_starter.AppStarter.md#start)
- [stop](app_starter.AppStarter.md#stop)

## Constructors

### constructor

• **new AppStarter**(`appFlow`): [`AppStarter`](app_starter.AppStarter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appFlow` | [`AppFlow`](app_flow.AppFlow.md) |

#### Returns

[`AppStarter`](app_starter.AppStarter.md)

#### Defined in

[app-starter.ts:13](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L13)

## Properties

### \_flow

• `Protected` **\_flow**: [`AppFlow`](app_flow.AppFlow.md)

#### Defined in

[app-starter.ts:10](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L10)

___

### \_status

• `Protected` **\_status**: [`AppStarterStatusMapper`](../enums/app_starter.AppStarterStatusMapper.md) = `AppStarterStatusMapper.STOPPED`

#### Defined in

[app-starter.ts:11](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L11)

## Methods

### \_gracefulStop

▸ **_gracefulStop**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-starter.ts:40](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L40)

___

### \_onError

▸ **_onError**(`err`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-starter.ts:45](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L45)

___

### \_registerOnExit

▸ **_registerOnExit**(): `void`

#### Returns

`void`

#### Defined in

[app-starter.ts:32](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L32)

___

### start

▸ **start**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-starter.ts:17](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L17)

___

### stop

▸ **stop**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-starter.ts:51](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-starter.ts#L51)
