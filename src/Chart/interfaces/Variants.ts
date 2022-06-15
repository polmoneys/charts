export const variantNames = ['line', 'series', 'area', 'rect', 'skyline', 'bar', 'peak', 'pyramid', 'skyScraper', 'cube', 'pie'] as const;
type Variants = typeof variantNames[number];

export default Variants;
