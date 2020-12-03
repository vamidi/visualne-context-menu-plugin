/**
 * @param obj - Object to copy over.
 * TODO maybe use lodash instead of this.
 */
import { Component, Node } from 'visualne';

export interface ComponentItem
{
    onClick?: Function;
    title: string,
    subItems?: ComponentItem[],
}

export interface DebouncedFunc<T extends (...args: any[]) => any> {
    /**
     * Call the original function, but applying the debounce rules.
     *
     * If the debounced function can be run immediately, this calls it and returns its return
     * value.
     *
     * Otherwise, it returns the return value of the last invokation, or undefined if the debounced
     * function was not invoked yet.
     */
    (...args: Parameters<T>): ReturnType<T> | undefined;

    /**
     * Throw away any pending invokation of the debounced function.
     */
    cancel(): void;

    /**
     * If there is a pending invokation of the debounced function, invoke it immediately and return
     * its return value.
     *
     * Otherwise, return the value from the last invokation, or undefined if the debounced function
     * was never invoked.
     */
    flush(): ReturnType<T> | undefined;
}

export function deepCopy<T>(obj: T): T
{
    return JSON.parse(JSON.stringify(obj));
}

export async function createNode(component: Component, { data = {}, meta = {}, x = 0, y = 0 }): Promise<Node>
{
    const node = await component.createNode(deepCopy(data));

    node.meta = Object.assign(deepCopy(meta), node.meta);
    node.position[0] = x;
    node.position[1] = y;

    return node;
}

export function traverse(items, callback, path: any[] = []) {
    if (typeof items !== 'object') return;

    Object.keys(items).map(key => {
        if (typeof items[key] === 'function')
            callback(key, items[key], path)
        else
            traverse(items[key], callback, [...path, key])
    })
}

export function fitViewport([x, y], element) {
    return [
        Math.min(x, window.innerWidth - element.clientWidth),
        Math.min(y, window.innerHeight - element.clientHeight)
    ]
}
