// TODO: Create common code for frontend and backend,
// and remove this code duplication. -MANI
function create(Rx, event$Array) {
  return {
    event$: Rx.Observable.merge(...event$Array)
  }
}

export default {
  create
}
