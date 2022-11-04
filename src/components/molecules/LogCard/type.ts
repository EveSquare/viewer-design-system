export interface Props {
    title: string,
    description: string,
    url: string,
    tags: Array<Tag>,
}

export interface Tag {
    color: string;
    tag: {
        name: string;
    }
}

