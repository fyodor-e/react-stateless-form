import { FC } from "react"
import useField from "../src/useField"

type SimpleComponentProps = { requiredProp: string, optionalProp?: number }
type Value = {}

const SimpleComponent: FC<SimpleComponentProps> = () => null

const Success = () => {
    const Field = useField<Value, SimpleComponentProps, {}>({
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

// as and name props rename
const AsPropRename = () => {
    const Field = useField<Value, SimpleComponentProps, {}, 'as1'>({
        values: {},
        touched: {},
        errors: {},
        asProp: 'as1',
        convertFunction: () => ({ requiredProp: '' }),
    }, [])

    return <Field as1={SimpleComponent} name='' />
}

const NamePropRename = () => {
    const Field = useField<Value, SimpleComponentProps, {}, 'as', 'name1'>({
        values: {},
        touched: {},
        errors: {},
        nameProp: 'name1',
        convertFunction: () => ({ requiredProp: '' }),
    }, [])

    return <Field as={SimpleComponent} name1='' />
}

const NameAndAsPropRename = () => {
    const Field = useField<Value, SimpleComponentProps, {}, 'as1', 'name1'>({
        values: {},
        touched: {},
        errors: {},
        asProp: 'as1',
        nameProp: 'name1',
        convertFunction: () => ({ requiredProp: '' }),
    }, [])

    return <Field as1={SimpleComponent} name1='' />
}

const RenamedAsPropsIsMissingInFieldComponentPorps = () => {
    const Field = useField<Value, SimpleComponentProps, {}, 'as1'>({
        values: {},
        touched: {},
        errors: {},
        asProp: 'as1',
        convertFunction: () => ({ requiredProp: '' }),
    }, [])

    // @ts-expect-error
    return <Field as={SimpleComponent} name='' />
}

const RenamedNamePropsIsMissingInFieldComponentPorps = () => {
    const Field = useField<Value, SimpleComponentProps, {}, 'as', 'name1'>({
        values: {},
        touched: {},
        errors: {},
        nameProp: 'name1',
        convertFunction: () => ({ requiredProp: '' }),
    }, [])

    // @ts-expect-error
    return <Field as={SimpleComponent} name='' />
}