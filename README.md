# REACT LAZY LOAD 

![Version](https://img.shields.io/npm/v/react-observer-api?style=for-the-badge) ![License](https://img.shields.io/npm/l/react-observer-api?style=for-the-badge) ![Size](https://img.shields.io/bundlephobia/minzip/react-observer-api?style=for-the-badge)

**React Lazy Loading** - It is easy to integrate with React to Lazyload components, Images, etc. It will monitor element and tell you when element enters into the viewport. So that can perform any operation when the component in viewport and initial load will get reduce. Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.  
Internally used [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

💥💥💥 **React library for Multiselect Dropdown. [Check it Out](https://github.com/srigar/multiselect-react-dropdown)** 💥💥💥

## Features
* 🎧 **Hooks or Component** - With ```useVisibilityHook``` it's easier to monitor elements and perform any operations.
* 🔥 **Performance** - No multiple listener for scroll, resize, etc.
* 🔦 **Bundle** - Light weight, ~3.5kb
* 🎁 **Features** - ```forceVisible```, ```forceCheck``` to manually perform operations.
* 💥 **Memory optimization** - Observer will disconnect once component reached viewport/unmount


## Installation

React Lazy Load requires React v16.8 or later.
```
npm install --save react-observer-api
```

## Usage
### 1. Using Hook
```isVisible``` will be true once DOM is visible in the viewport.  
```setElement``` need to pass it to the ref as shown below.  
```jsx
import { useVisibilityHook } from 'react-observer-api';

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

```js
{
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}
```

For more details about options and usage, [Click here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage) 

```jsx
import { useVisibilityHook } from 'react-observer-api';

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

```jsx
import { useVisibilityHook } from 'react-observer-api';

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

```jsx
import { LazyLoad } from 'react-observer-api';

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

```jsx
import { LazyLoad } from 'react-observer-api';

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

You can import the polyfill directly or use a service like polyfill.io to add it when needed.
```
npm i intersection-observer
```
Then import it in your app:
```
import 'intersection-observer'
```

If you are using Webpack (or similar) you could use dynamic imports, to load the Polyfill only if needed. A basic implementation could look something like this:

```
    /**
    * Do feature detection, to figure out which polyfills needs to be imported.
    **/
    async function loadPolyfills() {
        if (typeof window.IntersectionObserver === 'undefined') {
            await import('intersection-observer')
        }
    }

```

## Licence
MIT
