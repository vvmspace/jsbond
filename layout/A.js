import 'react';

const A = props => (<A href={props.href} title={props.title || ''} className={props.className}>{props.children}</A> )
export default A;