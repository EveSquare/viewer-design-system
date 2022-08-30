import styled from 'styled-components'

export const StyledSpeechBubbles = styled.div`
    & {
        position: relative;
        background-color: var(--chakra-colors-secondary);
        color: var(--chakra-colors-chakra-body-text);
        padding: 1.125em 1.5em;
        font-size: 1.25em;
        border-width: 1px;
        border-color: var(--chakra-colors-chakra-border-color);
        border-radius: var(--chakra-radii-lg);
        border-shadow: var(--chakra-shadows-md);
        box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);
    }
    &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        bottom: 100%;
        right: -1rem;
        bottom: 2.5rem;
        rotate: 90deg;
        border: .75rem solid transparent;
        border-top: none;
        border-bottom-color: var(--chakra-colors-secondary);
        filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, .1));
    }
}
`