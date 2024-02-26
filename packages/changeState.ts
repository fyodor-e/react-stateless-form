type BaseS = { [key: string]: number | string | null | undefined | BaseS }
type K = keyof BaseS

function changeStateHelper<S extends BaseS, A extends keyof S = keyof S>(arg: {
  prevState: S
  handleChangeState: (newState: S) => void
  path: [A]
  value: S[A]
}): void;
function changeStateHelper<
  S extends BaseS,
  A extends keyof S = keyof S,
  B extends keyof NonNullable<S[A]> = keyof NonNullable<S[A]>
>(arg: {
  prevState: S
  handleChangeState: (newState: S) => void
  path: [A, B]
  value: NonNullable<S[A]>[B]
}): void;
function changeStateHelper({
  prevState,
  handleChangeState,
  path,
  value,
}: {
  prevState: any
  handleChangeState: (newState: any) => void
  path: (string | number)[]
  value: any
}) {
  if (path.length === 0) return
  if (path.length === 1) {
    handleChangeState({
      ...prevState,
      [prevState[path[0]]]: value,
    })
    return
  }
  
  changeStateHelper({
    prevState: prevState[path[0]],
    path: path.slice(1),
    value,
    handleChangeState: (arg) => {
      handleChangeState({ ...prevState, ...arg })
    },
  })
};

export default changeStateHelper