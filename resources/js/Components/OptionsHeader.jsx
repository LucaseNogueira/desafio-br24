import styled from "styled-components";

const OptionsContainer = styled.ul`
    flex: 1;
    display:flex;
    justify-content: ${props => props.justifyContent || 'initial'};
`

const Option = styled.li`
    cursor: pointer;
    display: flex;
    color: ${props => props.linkColor || '#fff'};
    text-decoration: none;
    list-style: none;
    padding: 0 5px;
`

export default function OptionsHeader({links, linkColor, justifyContent}){
    return (
        <OptionsContainer justifyContent={justifyContent}>
            { links.map((link) => (
                <Option linkColor={linkColor}><a href={link.href}>{link.title}</a></Option>
            ))}
        </OptionsContainer>
    );
}
