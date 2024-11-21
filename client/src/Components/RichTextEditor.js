
import React, { useState } from 'react';
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css';


const RichTextEditor = () => {
  const [content, setContent] = useState('Default value');

  const onChange = (content) => {
    console.log('onChange', content);
  };

  return (
    <></>
    // <ReactSummernote
    //   value={content}
    //   options={{
    //     lang: 'ru-RU',
    //     height: 350,
    //     dialogsInBody: true,
    //     toolbar: [
    //       ['style', ['style']],
    //       ['font', ['bold', 'underline', 'clear']],
    //       ['fontname', ['fontname']],
    //       ['para', ['ul', 'ol', 'paragraph']],
    //       ['table', ['table']],
    //       ['insert', ['link', 'picture', 'video']],
    //       ['view', ['fullscreen', 'codeview']],
    //     ],
    //   }}
    //   onChange={onChange}
    // />
  );
};

export default RichTextEditor;

