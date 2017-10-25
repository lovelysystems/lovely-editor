import * as React from 'react'
import PropTypes from 'prop-types'

// Example Toolbar
// - http://quilljs.com/standalone/full/
export const QuillToolbar = function(props) {
  const { id } = props
  return (
    <div className="ql-toolbar" id={`toolbar-${id}`} >
      <select className="ql-header" defaultValue="">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="" />
      </select>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </div>
  )
}

QuillToolbar.propTypes = {
  id: PropTypes.number.isRequired,
}
