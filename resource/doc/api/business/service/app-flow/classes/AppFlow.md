[**@beecode/msh-app-boot**](../../../../README.md)

***

[@beecode/msh-app-boot](../../../../README.md) / [business/service/app-flow](../README.md) / AppFlow

# Abstract Class: AppFlow

Defined in: [business/service/app-flow.ts:11](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L11)

## Constructors

### Constructor

> `protected` **new AppFlow**(...`args`): `AppFlow`

Defined in: [business/service/app-flow.ts:14](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L14)

#### Parameters

##### args

...[`FlowList`](../type-aliases/FlowList.md)

#### Returns

`AppFlow`

## Properties

### \_flowList

> `protected` `readonly` **\_flowList**: [`FlowList`](../type-aliases/FlowList.md)

Defined in: [business/service/app-flow.ts:12](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L12)

## Methods

### \_topLevelReversedFlowList()

> `protected` **\_topLevelReversedFlowList**(): [`FlowList`](../type-aliases/FlowList.md)

Defined in: [business/service/app-flow.ts:29](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L29)

#### Returns

[`FlowList`](../type-aliases/FlowList.md)

***

### create()

> **create**(): `Promise`\<`void`\>

Defined in: [business/service/app-flow.ts:18](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L18)

#### Returns

`Promise`\<`void`\>

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: [business/service/app-flow.ts:22](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L22)

#### Returns

`Promise`\<`void`\>

***

### DeepExecFlowList()

> `static` **DeepExecFlowList**(`params`): `Promise`\<`void`\>

Defined in: [business/service/app-flow.ts:33](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L33)

#### Parameters

##### params

###### direction

[`FlowDirectionMapper`](../enumerations/FlowDirectionMapper.md)

###### flowList

[`FlowList`](../type-aliases/FlowList.md)

#### Returns

`Promise`\<`void`\>

***

### ExecSyncFlowList()

> `static` **ExecSyncFlowList**(`lifeCycleList`, `createOrDestroy`): `Promise`\<`void`\>

Defined in: [business/service/app-flow.ts:52](https://github.com/beecode-rs/msh-app-boot/blob/f03720bc0da2ffbc23eb0b04dd0c7dcf87ac181d/src/business/service/app-flow.ts#L52)

#### Parameters

##### lifeCycleList

[`LifeCycle`](../../life-cycle/classes/LifeCycle.md)\<`any`\>[]

##### createOrDestroy

[`FlowDirectionMapper`](../enumerations/FlowDirectionMapper.md)

#### Returns

`Promise`\<`void`\>
