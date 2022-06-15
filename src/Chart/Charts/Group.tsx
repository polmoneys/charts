import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    round: boolean;
    stroke: { color: string; width: number };
    transform?: string;
}

function Group(props: Props) {
    const {
        children,
        round = true,
        stroke: { color, width },
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
