// src/components/atoms/Title.jsx
function Title(props) {
    const nivel = props.nivel || 1;
    const Tag = `h${nivel}`;

    return (
        <Tag className={props.className}>
            {props.texto}
        </Tag>
    );
}

export default Title;