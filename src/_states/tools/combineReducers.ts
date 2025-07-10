type Reducer<A> = (state?: any, action?: A) => any;

type ReducersMapObject<A> = {
  [K: string]: Reducer<A>;
};

export function combineReducers<A>(
  reducers: ReducersMapObject<A>
): Reducer<A> {
  return (state?: any, action?: A): any => {
      const newState = {} as any;
      for (const key in reducers) {
        newState[key] = reducers[key](state?.[key], action);
      }
      return newState;
  };
}