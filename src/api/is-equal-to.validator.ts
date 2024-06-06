import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsEqualToConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments) {
    const [relatedPropertyName] = validationArguments.constraints;
    const relatedValue = (validationArguments.object as any)[
      relatedPropertyName
    ];
    return value === relatedValue;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const [relatedPropertyName] = validationArguments.constraints;
    return `fields ${validationArguments.property} and ${relatedPropertyName} should be equal`;
  }
}

export function IsEqualTo(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsEqualToConstraint,
    });
  };
}
