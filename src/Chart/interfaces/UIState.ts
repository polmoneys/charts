import UIProps from './UIProps';

interface UIState extends Pick<UIProps, 'type' | 'message' | 'displayed'> {}
export default UIState;
