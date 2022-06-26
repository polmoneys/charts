import { Value } from './Values';

export const uiElements = ['initial', 'tooltip', 'caption'] as const;
export type UIElements = typeof uiElements[number];

interface UIProps {
    type: UIElements;
    message: string | Array<Value>;
    source: string;
    onClick: () => void;
    displayed: boolean;
    theme: { bg: string; color: string; border: string; chartBg?: string };
}
export default UIProps;
