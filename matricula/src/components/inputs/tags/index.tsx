import React, { useState } from 'react';
//import { render } from 'react-dom';
import { COUNTRIES } from './countries';
import './style.css';
import { WithContext as ReactTags, Tag } from 'react-tag-input';




export default function Tags() {

    const [tags, setTags] = useState<Tag[]>([])



    function handleDelete(i: number) {
        const updateTags = tags.filter((tag, index) => index !== i)
        setTags(updateTags);
    }

    function handleAddition(tag: Tag) {
        const updateTags = [...tags]
        updateTags.push({ id: String(tags.length + 1), text: tag.text })
        setTags(updateTags);
    }

    function handleDrag(tag: Tag, currPos: number, newPos: number) {
        const updateTags = [...tags];

        // mutate array
        updateTags.splice(currPos, 1);
        updateTags.splice(newPos, 0, tag);

        // re-render
        setTags(updateTags)
    }



    return (
        <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            placeholder='tags'

        />
    );

}

  //render(<Tags />, document.getElementsByClassName('tag'));

