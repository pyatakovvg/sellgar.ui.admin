export function Controller(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata('_controller_', true, target);
  };
}
