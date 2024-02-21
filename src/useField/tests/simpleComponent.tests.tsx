import { FC } from "react"
import useField from "../useField"

type SimpleComponentProps = { requiredProp: string, optionalProp?: number }
type Value = {}

const SimpleComponent: FC<SimpleComponentProps> = () => null

const Success = () => {
    const Field = useField<Value, SimpleComponentProps>({
        values: {},
        touched: {},
        errors: {},
        convertFunction: () => ({ requiredProp: '', optionalProp: 2 }),
    }, [])

    return <Field as={SimpleComponent} name='' requiredProp="2" />
}

const RequiredPropMissingInConvertFunction = () => {
    const Field = useField<Value, SimpleComponentProps>({
        values: {},
        touched: {},
        errors: {},
        // @ts-expect-error
        convertFunction: () => ({ optionalProp: 2 }),
    }, [])

    return <Field as={SimpleComponent} name='' />
}

type AnotherComponentProps = { anotherRequiredProp: number }

const AnotherComponent: FC<AnotherComponentProps> = () => null

const IncompatibleComponent = () => {
    const Field = useField<Value, SimpleComponentProps>({
        values: {},
        touched: {},
        errors: {},
        convertFunction: () => ({ requiredProp: '' }),
    }, [])

    // @ts-expect-error
    return <Field as={AnotherComponent} name='' />
}

type AdditionsProps = { additionlProp: string }

const AdditionalConevrtFunctionProps = () => {
    const Field = useField<Value, SimpleComponentProps, AdditionsProps>({
        values: {},
        touched: {},
        errors: {},
        convertFunction: ({ additionlProp }) => ({ requiredProp: '' }),
    }, [])

    return <Field as={SimpleComponent} name='' additionlProp="" />
}

const AdditionalPropIsMissingInFieldProps = () => {
    const Field = useField<Value, SimpleComponentProps, AdditionsProps>({
        values: {},
        touched: {},
        errors: {},
        convertFunction: ({ additionlProp }) => ({ requiredProp: '' }),
    }, [])

    // @ts-expect-error
    return <Field as={SimpleComponent} name='' />
}