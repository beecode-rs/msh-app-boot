[@beecode/msh-app-boot](../README.md) / [life-cycle](../modules/life_cycle.md) / LifeCycle

# Class: LifeCycle\<T\>

[life-cycle](../modules/life_cycle.md).LifeCycle

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Constructors

- [constructor](life_cycle.LifeCycle.md#constructor)

### Properties

- [name](life_cycle.LifeCycle.md#name)

### Methods

- [\_createFn](life_cycle.LifeCycle.md#_createfn)
- [\_destroyFn](life_cycle.LifeCycle.md#_destroyfn)
- [create](life_cycle.LifeCycle.md#create)
- [destroy](life_cycle.LifeCycle.md#destroy)

## Constructors

### constructor

• **new LifeCycle**\<`T`\>(`params`): [`LifeCycle`](life_cycle.LifeCycle.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.name` | `string` |

#### Returns

[`LifeCycle`](life_cycle.LifeCycle.md)\<`T`\>

#### Defined in

[life-cycle.ts:9](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/life-cycle.ts#L9)

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

[life-cycle.ts:7](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/life-cycle.ts#L7)

## Methods

### \_createFn

▸ **_createFn**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

[life-cycle.ts:4](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/life-cycle.ts#L4)

___

### \_destroyFn

▸ **_destroyFn**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

[life-cycle.ts:5](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/life-cycle.ts#L5)

___

### create

▸ **create**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

[life-cycle.ts:14](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/life-cycle.ts#L14)

___

### destroy

▸ **destroy**(): `Promise`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Defined in

[life-cycle.ts:22](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/life-cycle.ts#L22)
