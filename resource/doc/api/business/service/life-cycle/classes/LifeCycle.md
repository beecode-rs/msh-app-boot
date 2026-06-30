[**@beecode/msh-app-boot**](../../../../README.md)

***

[@beecode/msh-app-boot](../../../../README.md) / [business/service/life-cycle](../README.md) / LifeCycle

# Abstract Class: LifeCycle\<T\>

Defined in: [business/service/life-cycle.ts:4](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L4)

## Type Parameters

### T

`T` = `any`

## Constructors

### Constructor

> `protected` **new LifeCycle**\<`T`\>(`params`): `LifeCycle`\<`T`\>

Defined in: [business/service/life-cycle.ts:10](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L10)

#### Parameters

##### params

###### name

`string`

#### Returns

`LifeCycle`\<`T`\>

## Properties

### name

> `readonly` **name**: `string`

Defined in: [business/service/life-cycle.ts:8](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L8)

## Methods

### \_createFn()

> `abstract` `protected` **\_createFn**(): `Promise`\<`T`\>

Defined in: [business/service/life-cycle.ts:5](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L5)

#### Returns

`Promise`\<`T`\>

***

### \_destroyFn()

> `abstract` `protected` **\_destroyFn**(): `Promise`\<`T`\>

Defined in: [business/service/life-cycle.ts:6](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L6)

#### Returns

`Promise`\<`T`\>

***

### create()

> **create**(): `Promise`\<`T`\>

Defined in: [business/service/life-cycle.ts:15](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L15)

#### Returns

`Promise`\<`T`\>

***

### destroy()

> **destroy**(): `Promise`\<`T`\>

Defined in: [business/service/life-cycle.ts:23](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/life-cycle.ts#L23)

#### Returns

`Promise`\<`T`\>
