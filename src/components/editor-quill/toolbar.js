import * as React from 'react'
import PropTypes from 'prop-types'

// based on the example: http://quilljs.com/standalone/full/
export const QuillToolbar = ({ id }) => {
  return (
    <div className="ql-toolbar" id={`toolbar-${id}`}>
      <span className="ql-formats">
        <select className="ql-font" aria-label="change font" />
        <select className="ql-size" aria-label="change size" />
      </span>
      <span className="ql-formats">
        <button className="ql-bold" type="button" aria-label="bold" />
        <button className="ql-italic" type="button" aria-label="italic" />
        <button className="ql-underline" type="button" aria-label="underline" />
        <button className="ql-strike" type="button" aria-label="strike" />
      </span>
      <span className="ql-formats">
        <select className="ql-color" aria-label="change color" />
        <select className="ql-background" aria-label="change background" />
      </span>
      <span className="ql-formats">
        <button
          className="ql-script"
          value="sub"
          type="button"
          aria-label="sub"
        />
        <button
          className="ql-script"
          value="super"
          type="button"
          aria-label="super"
        />
      </span>
      <span className="ql-formats">
        <button
          className="ql-header"
          value="1"
          type="button"
          aria-label="add headline 1"
        />
        <button
          className="ql-header"
          value="2"
          type="button"
          aria-label="add headline 2"
        />
        <button
          className="ql-blockquote"
          type="button"
          aria-label="add blockquote"
        />
        <button
          className="ql-code-block"
          type="button"
          aria-label="add codeblock"
        />
      </span>
      <span className="ql-formats">
        <button
          className="ql-list"
          value="ordered"
          type="button"
          aria-label="add ordered-list"
        />
        <button
          className="ql-list"
          value="bullet"
          type="button"
          aria-label="add unordered-list"
        />
        <button
          className="ql-indent"
          value="-1"
          type="button"
          aria-label="indent -1"
        />
        <button
          className="ql-indent"
          value="+1"
          type="button"
          aria-label="indent +1"
        />
      </span>
      <span className="ql-formats">
        <button
          className="ql-direction"
          value="rtl"
          type="button"
          aria-label="change direction"
        />
        <select className="ql-align" aria-label="align text" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" type="button" aria-label="add link" />
        <button className="ql-image" type="button" aria-label="add image" />
        <button className="ql-video" type="button" aria-label="add video" />
        <button
          className="ql-formula"
          type="button"
          aria-label="add formular"
        />
      </span>
      <span className="ql-formats">
        <button className="ql-clean" type="button" aria-label="clean styles" />
      </span>
    </div>
  )
}

QuillToolbar.propTypes = {
  id: PropTypes.number.isRequired,
}
