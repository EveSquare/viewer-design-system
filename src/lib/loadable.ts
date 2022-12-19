type LoadableState<T> =
  | {
      type: "pending";
      promise: Promise<T>;
    }
  | {
      type: "fulfilled";
      result: T;
    }
  | {
      type: "rejected";
      error: unknown;
    };

class Loadable<T> {
  #state: LoadableState<T>;

  constructor(promise: Promise<T>) {
    const p = promise.then(
      (result) => {
        this.#state = {
          type: "fulfilled",
          result,
        };
        return result;
      },
      (error) => {
        this.#state = {
          type: "rejected",
          error,
        };
        throw error;
      }
    );
    this.#state = {
      type: "pending",
      promise: p,
    };
  }

  get(): T {
    switch (this.#state.type) {
      case "pending": {
        throw this.#state.promise;
      }
      case "fulfilled": {
        return this.#state.result;
      }
      case "rejected": {
        throw this.#state.error;
      }
    }
  }
}
export default Loadable;
