export function HandleErrors(constructor: Function) {
  const propertyNames = Object.getOwnPropertyNames(constructor.prototype);

  for (const propertyName of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(
      constructor.prototype,
      propertyName
    );

    const isMethod = descriptor && typeof descriptor.value === "function";

    if (isMethod && propertyName !== "constructor") {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any) {
        try {
          await originalMethod.apply(this, args);
        } catch (error) {
          throw new Error(error);
        }
      };

      Object.defineProperty(constructor.prototype, propertyName, descriptor);
    }
  }
}

export function HandleError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(target);
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        throw new Error(error.message);
      }
    };
  };
}
