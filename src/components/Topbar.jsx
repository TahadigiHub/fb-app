import React from 'react'
export default function Topbar() {
  return (
    <div style={{ display: 'flex', alignItems: 'left',backgroundColor: 'white', padding: '10px', width: '100%', height: '60px', position: 'fixed', top: 0, left: 0, zIndex: 1000 ,borderShadow: '0 0 20px 0 rgba(0, 0, 0, 0.5)',borderBottom: '1px solid black'}}>
       <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt=" Facebook logo" style={{ width: '50px', height: '50px',borderRadius: '25px'}} />
       <input type="text" name='search' placeholder="Search Facebook" style={{marginRight:'5px', padding: '5px 10px 5px 20px' ,width: '200px', height: '30px', borderRadius: '25px', border: '1px solid black', margin: '10px' , backgroundColor:'#F2F4F7' , maxWidth:'1400px'}} />   
       <img src="././src/assets/user.png" alt='User' style={{ width: '30px', height: '30px', margin: '10px' , paddingLeft:'900px'}} />
    </div>
  )
}
