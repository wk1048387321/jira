import React from "react";

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');

    whyDidYouRender(React, {
        // 是否追踪全部组件
        trackAllPureComponents: false,
    })
}
