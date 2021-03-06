import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    stroke: { color: string; width: number; round: boolean };
    transform?: string;
}

function Group(props: Props) {
    const {
        children,
        stroke: { color, width, round = true },
        transform,
    } = props;
    return (
        <g
            aria-hidden="true"
            strokeLinecap={round ? 'round' : 'butt'}
            strokeLinejoin={round ? 'round' : 'miter'}
            stroke={color}
            strokeWidth={width}
            {...(transform !== undefined && { transform })}
        >
            {children}
        </g>
    );
}

export default Group;
Group.displayName = 'Group';
