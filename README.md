# REACT LAZYLOAD 
React Lazy Loading - It is easy to integrate with React to Lazyload components, Images, etc. Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages. Internally used [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Installation

React Lazy Load requires React v16.8 or later.
```
npm install --save react-lazyloading
```

## Demo


## Usage
### 1. Using Hook
```isVisible``` will be true once DOM is visible in the viewport.  
```setElement``` need to pass it to the ref as shown below.  
```
    import { useVisibilityHook } from 'react-lazyloading';

    export default () => {
        const { setElement, isVisible } = useVisibilityHook();

        useEffect(() => {
            if (isVisible) {
                ...Logics/API call can trigger by watching isVisible property
            }
        }, [isVisible])

        return {
            <div ref={setElement}>
                {isVisible && (
                    <>
                        ...Component need to render goes here....
                    <>
                )}
            </div>
        }
    }
```

#### Config Options - Optional

It allow to pass config options as param (optional). 

```
    {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }
```

For more details about options and usage, [Click here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage) 

```
    import { useVisibilityHook } from 'react-lazyloading';

    export default () => {
        const { setElement, isVisible } = useVisibilityHook({
            threshold: 0.5,
            rootMargin: '100px'
        });
        ...
    }
```

#### Force Visible

For some case, based on condition/logic may need to show the dom before it reaches to viewport. In that scenario, by calling ```forceVisible()``` will load the dom.

```
    import { useVisibilityHook } from 'react-lazyloading';

    export default () => {
        const { setElement, isVisible, forceVisible } = useVisibilityHook();

        useEffect(() => {
            forceVisible(); // isVisible become true, by manually calling this method.
        }, [])
        
        return {
            <div ref={setElement}>
                {isVisible && (
                    <>
                        ...Component need to render goes here....
                    <>
                )}
            </div>
        }
    }
```

### 2. Using Component

The above same can achieved through Component as well. Need to wrap ```LazyLoad``` on top of the component for lazyloading

```
    import { LazyLoad } from 'react-lazyloading';

    export default () => {
        
        return {
            <LazyLoad>
                <>...Component goes here....</>
            </LazyLoad>
        }
    }
```

#### Optional Props
| prop        | Type | Default  | Description |
| ------------- |-----| -----| ----------- |
| options      | object | { root: null, threshold: 0.25, rootMargin: '-10px' } | [Click for more usage about options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage)|
| as     | string      |   div | Wrapper element can be change by passing valid tag name. Ex: span / p / div |
| style | object     |    {} | Custom CSS for wrapper element|
| forceVisible | boolean     |    false | Passing true to render dom without waiting to reach the viewport|

#### Example

```
    import { LazyLoad } from 'react-lazyloading';

    export default () => {
        const style = {
            padding: 10
        };
        return {
            <LazyLoad as="span" style={style} forceVisible>
                <>...Component goes here....</>
            </LazyLoad>
        }
    }
```

## Note
For IE support, need to add [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

## Licence
MIT
