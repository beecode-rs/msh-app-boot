/*
 * Fixtures for ./app-flow.contract.yaml
 *
 * Each fake lifecycle resolves on one direction and rejects on the other, so a
 * contract term asserts *which* method (create vs destroy) the AppFlow statics
 * invoke: calling the wrong direction rejects the promise and fails the test.
 */

function succeed(): Promise<void> {
	return Promise.resolve()
}

function rejectCreate(): Promise<void> {
	return Promise.reject(new Error('unexpected create()'))
}

function rejectDestroy(): Promise<void> {
	return Promise.reject(new Error('unexpected destroy()'))
}

/* create() succeeds; destroy() is forbidden. Use with direction 'create'. */
export const createLifeCycle = { create: succeed, destroy: rejectDestroy }

/* destroy() succeeds; create() is forbidden. Use with direction 'destroy'. */
export const destroyLifeCycle = { create: rejectCreate, destroy: succeed }
