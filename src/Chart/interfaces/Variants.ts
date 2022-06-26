export const variantNames = ['line', 'series', 'area', 'rect', 'skyline', 'bar', 'peak', 'pyramid', 'skyScraper', 'cube', 'pie', 'stack', 'dots'] as const;
type Variants = typeof variantNames[number];

export default Variants;
