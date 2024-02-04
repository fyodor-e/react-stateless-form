"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// function useField<
//   ComponentProps extends Record<string, any>,
//   GeneratedProps extends Partial<ComponentProps>,
//   PassedProps extends ComponentProps,
// >({
//   Component,
//   convertFunction,
// }: {
//   Component?: undefined;
//   convertFunction: ConvertFunction<PassedProps, GeneratedProps>;
// }, deps: DependencyList): (Component: FC<ComponentProps>) => FC<PassedProps>;
// function useField<
//   ComponentProps extends Record<string, any>,
//   GeneratedProps extends Partial<ComponentProps>,
//   PassedProps extends ComponentProps,
// >({
//   Component,
//   convertFunction,
// }: {
//   Component: FC<ComponentProps>;
//   convertFunction: ConvertFunction<PassedProps, GeneratedProps>;
// }, deps: DependencyList): FC<PassedProps>;
function useField(_a, deps) {
    var componentPropName = _a.componentPropName, convertFunction = _a.convertFunction;
    return (0, react_1.useCallback)(function (props) {
        var generatedProps = convertFunction(props);
        var Component = props[componentPropName];
        return <Component {...props} {...generatedProps}/>;
    }, [componentPropName, deps]);
}
exports.default = useField;
