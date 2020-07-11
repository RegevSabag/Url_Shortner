import React from 'react';

const Table = (props) => {

  return (
    <div className="tableContainer">
    {
      !props.urls.length?null:
      <table>
        <thead>
          <tr>
            <th style={{borderRight:'1px solid #939aa0'}}>Base URL</th>
            <th style={{borderRight:'1px solid #939aa0'}}>Shorten URL</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
        {
          props.urls.map((value,index) =>{
            return (
              <tr key={index}>
                <td>{value.baseURL}</td>
                <td><a target="_blank" rel="noopener noreferrer" href={'http://'+value.shotenURL}>{value.shotenURL}</a></td>
                <td style={{textAlign: 'center'}}>{new Date(value.createAt).toLocaleString()}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    }
    </div>
  )
}

export default Table;