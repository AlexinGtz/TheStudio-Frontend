import { useRef, useEffect } from 'react';

export const useDynamicSVG = (filename) => {
    const svgRef = useRef();

    useEffect(() => {
        const importSVG = async () => {
            try {
                const svg = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../assets/Icons/${filename}.svg`));
                svgRef.current = svg.default;
            } catch (e) {
                console.log('error', e);
            }
        };

        importSVG();
    }, [filename]);

    return svgRef.current;
};
