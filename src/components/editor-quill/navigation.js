import * as React from 'react'

// Example Toolbar
// - http://quilljs.com/standalone/full/
export const CustomToolbar = function() {
  return (
    <div id="toolbar">
      <select className="ql-header" defaultValue="">
        <option value="1" />
        <option value="2" />
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
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
      <select className="ql-color" defaultValue="">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option value="" />
      </select>
    </div>
  )
}
