import React from 'react';
import useVisibilityHook from './useVisibilityHook';

export default (props) => {
    const { children, config = {}, style, as } = props;
    const CustomTag = as || 'div';
    const { setElement, isVisible } = useVisibilityHook(config);
    return (
        <CustomTag ref={setElement} style={style}>
            {isVisible && children}
        </CustomTag>
    );
};