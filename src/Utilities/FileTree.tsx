import { readdir } from 'fs';
import { parse } from 'path';

import './Tree.css'
import TreeView from './TreeView';

function FileTree({ file }) {
  const files = file.files || []


  function toFileObj(file, path) {
    const fullpath = `${path}/${file.name}`;
    const f = parse(fullpath);
    return {
      name: file.name,
      fullpath: fullpath,
      type: file.isDirectory() ? 'folder' : 'file',
      filetype: !file.isDirectory() && f.ext ? f.ext.substring(1) : ''
    }
  }


  const fetchChildren = (file) => {
    return new Promise(function (resolve, reject) {
      readdir(file.fullpath, { withFileTypes: true }, (err, files) => {
        const fileObjs = files.map(f => toFileObj(f, file.fullpath));
        resolve(fileObjs);
      });
    });
  }

  function constructOriginalFile(path) {
    const f = parse(path);
    return {
      fullpath: path,
      name: f.base,
      type: 'folder',
    }
  }

  return (
    <div>
      {file.name}

      <ul>
        {files.map(f =>
          <li>
            <TreeView file={f} fetchChildren={fetchChildren} />
          </li>)}
      </ul>
    </div>
  )
}

export default FileTree

