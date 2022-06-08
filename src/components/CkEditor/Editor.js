import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const MyCkeditor = (props) => {
  return (
    <div>
      <h6>Description</h6>
      <CKEditor
        editor={Editor}
        data="<p>Descripttion</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
          props.handleEditor(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default MyCkeditor;
