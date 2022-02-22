import React, { useState } from 'react';
//import { render } from 'react-dom';
import { COUNTRIES } from './countries';
import './style.css';
import { WithContext as ReactTags, Tag } from 'react-tag-input';


interface TagsChange{
    tags: Tag[];
    setTags: (a: Tag[]) => void;
}

/* export default function Tags() */const Tags: React.FC<TagsChange> = (props) => {

   // const [tags, setTags] = useState<Tag[]>([]) //Tag = id: string; text: string;
    


    const Keys = {
        TAB: 9,
        SPACE: 32,
        COMMA: 188,
        ENTER: 13
    };

    function handleDelete(i: number) {
        const updateTags = props.tags.filter((tag, index) => index !== i)
        props.setTags(updateTags)
    }

    function handleAddition(tag: Tag) {
        const updateTags = [...props.tags]
        updateTags.push({ id: String(props.tags.length + 1), text: tag.text })
        props.setTags(updateTags);
    }

    function handleDrag(tag: Tag, currPos: number, newPos: number) {
        const updateTags = [...props.tags];

        // mutate array
        updateTags.splice(currPos, 1);
        updateTags.splice(newPos, 0, tag);

        // re-render
        props.setTags(updateTags)
    }



    return (
        <ReactTags
            tags={props.tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            placeholder='tags'
            delimiters={[Keys.TAB, Keys.ENTER]}

        />
    );

}
export default Tags;
  //render(<Tags />, document.getElementsByClassName('tag'));

