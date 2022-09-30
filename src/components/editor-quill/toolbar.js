import * as React from 'react'
import PropTypes from 'prop-types'

// based on the example: http://quilljs.com/standalone/full/
export const QuillToolbar = function({ id }) {
  return (
    <div className="ql-toolbar" id={`toolbar-${id}`}>
      <span className="ql-formats">
        <select className="ql-font" />
        <select className="ql-size" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-bold" />
        <button type="button" className="ql-italic" />
        <button type="button" className="ql-underline" />
        <button type="button" className="ql-strike" />
      </span>
      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-script" value="sub" />
        <button type="button" className="ql-script" value="super" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-header" value="1" />
        <button type="button" className="ql-header" value="2" />
        <button type="button" className="ql-blockquote" />
        <button type="button" className="ql-code-block" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-list" value="ordered" />
        <button type="button" className="ql-list" value="bullet" />
        <button type="button" className="ql-indent" value="-1" />
        <button type="button" className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-direction" value="rtl" />
        <select className="ql-align" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-link" />
        <button type="button" className="ql-image" />
        <button type="button" className="ql-video" />
        <button type="button" className="ql-formula" />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-clean" />
      </span>
    </div>
  )
}

QuillToolbar.propTypes = {
  id: PropTypes.number.isRequired
}
