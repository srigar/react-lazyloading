import { useState, useEffect } from 'react';

const defaultConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
};

const useVisibilityHook = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [element, setElement] = useState(null);

    const visibilityCallBack = ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        let observer;
        if (!element) {
            return;
        }
        observer = new IntersectionObserver(visibilityCallBack, {
            ...defaultConfig,
            ...options
        });
        observer.observe(element);
        return () => observer && observer.disconnect();
    }, [element, options.root, options.rootMargin, root.threshold]);

    return { setElement, isVisible };
}

export default useVisibilityHook;