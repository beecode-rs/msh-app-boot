[@beecode/msh-app-boot](../README.md) / [app-flow](../modules/app_flow.md) / AppFlow

# Class: AppFlow

[app-flow](../modules/app_flow.md).AppFlow

## Table of contents

### Constructors

- [constructor](app_flow.AppFlow.md#constructor)

### Properties

- [\_flowList](app_flow.AppFlow.md#_flowlist)

### Methods

- [\_topLevelReversedFlowList](app_flow.AppFlow.md#_toplevelreversedflowlist)
- [create](app_flow.AppFlow.md#create)
- [destroy](app_flow.AppFlow.md#destroy)
- [DeepExecFlowList](app_flow.AppFlow.md#deepexecflowlist)
- [ExecSyncFlowList](app_flow.AppFlow.md#execsyncflowlist)

## Constructors

### constructor

• **new AppFlow**(`...args`): [`AppFlow`](app_flow.AppFlow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`FlowList`](../modules/app_flow.md#flowlist) |

#### Returns

[`AppFlow`](app_flow.AppFlow.md)

#### Defined in

[app-flow.ts:14](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L14)

## Properties

### \_flowList

• `Protected` `Readonly` **\_flowList**: [`FlowList`](../modules/app_flow.md#flowlist)

#### Defined in

[app-flow.ts:12](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L12)

## Methods

### \_topLevelReversedFlowList

▸ **_topLevelReversedFlowList**(): [`FlowList`](../modules/app_flow.md#flowlist)

#### Returns

[`FlowList`](../modules/app_flow.md#flowlist)

#### Defined in

[app-flow.ts:26](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L26)

___

### create

▸ **create**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-flow.ts:18](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L18)

___

### destroy

▸ **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-flow.ts:22](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L22)

___

### DeepExecFlowList

▸ **DeepExecFlowList**(`params`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.direction` | [`FlowDirectionMapper`](../enums/app_flow.FlowDirectionMapper.md) |
| `params.flowList` | [`FlowList`](../modules/app_flow.md#flowlist) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-flow.ts:30](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L30)

___

### ExecSyncFlowList

▸ **ExecSyncFlowList**(`lifeCycleList`, `createOrDestroy`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifeCycleList` | [`LifeCycle`](life_cycle.LifeCycle.md)\<`any`\>[] |
| `createOrDestroy` | [`FlowDirectionMapper`](../enums/app_flow.FlowDirectionMapper.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[app-flow.ts:49](https://github.com/beecode-rs/msh-app-boot/blob/ff89a8e/src/app-flow.ts#L49)
