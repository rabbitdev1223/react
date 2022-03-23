import React, { Component, useEffect } from 'react';


export default function App() {
  const theme = {
    lightTheme : {
      button_bgcolor:'#CC0000',
      button_text:'white',
      left_bgcolor:'#cecece',
      left_text_color:'#2f4f4f',
      right_bgcolor:'white',
      right_text_color:'#000000'
    },
    darkTheme: {
      button_bgcolor:'#f0f8ff',
      button_text:'#800080',
      left_bgcolor:'white',
      left_text_color:'#696969',
      right_bgcolor:'#008080',
      right_text_color:'white'
    }
  }
 
  const [themeName ,setThemeName] = React.useState("lightTheme");
  
  const [message ,setMessage] = React.useState("");
  
  const [actionArray,setActionArray] = React.useState([]);
  
  const [buttonCount,setButtonCount] = React.useState(0);

  useEffect(() => {
    
  },[]);


  const getDateTime = ()=> {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = month+'/'+day+ '/' + year + ' '+hour+':'+minute+':'+second;   
     return dateTime;
}

  const toggleTheme = ()=> {
    if (themeName == "lightTheme"){
      setThemeName("darkTheme");
      addStringToArray("Theme was set to Dark")
    }
    else{
      setThemeName("lightTheme");
      addStringToArray("Theme was set to Light")
   
    }
  }
  // 02/04/22 10:02:34

  const addStringToArray = (string) =>{
      //get current date
      var dateString = getDateTime() + " ";
      setActionArray([ dateString + string , ...actionArray ])
  }
  const sendMessage = ()=>{

    addStringToArray("Message Sent:[" + message + "]")
    
      setMessage("");
  }
  const changeMessage = (event) => {
    setMessage(event.target.value);
  }

  const addButton = ()=>{
    var buttonStr = buttonCount + 1;
    
    addStringToArray("Button  " + buttonStr + " added")
    setButtonCount(buttonStr)

  }
  const buttonClick = (index)=>{
    addStringToArray("Button  " + (index ) + " clicked")
  }

  var actionList = actionArray.map(action=>{

      return (
          <div>
              {action}
          </div>
    )});

    return (
      <div style={{display:'flex',height:'900px'}}>

        <div  style={{
            width:'50%',
           backgroundColor: theme[themeName].left_bgcolor,
           color:theme[themeName].left_text_color
        }}>
          <div style={{height:'150px',display:'flex',alignItems:'center'}}>
                <button style={{background: theme[themeName].button_bgcolor,color:theme[themeName].button_text}} onClick={toggleTheme}>
                {
                  themeName === "lightTheme"
                  ?
                  "Set Dark Theme"
                  :
                  "Set Light Theme"
                }
              </button>
            </div>
            <div style={{height:'250px'}}>
                <textarea name="textarea"  rows="5" cols="60" value={message} onChange={changeMessage}>
                  
                </textarea>
                <button style={{background: theme[themeName].button_bgcolor,color:theme[themeName].button_text}} 
                  onClick={sendMessage}
                  disabled = {message==""?true:false}>
                  Send a message
                </button>
            </div>

            <div style={{height:'50px'}}>
                <button style={{background: theme[themeName].button_bgcolor,color:theme[themeName].button_text}} 
                  onClick={addButton}
                  >
                  Add Button {buttonCount + 1}
                </button>
            </div>

            <div>
            {
                [...Array(buttonCount).keys()].map((x, i) =>
                  <button style={{background: theme[themeName].button_bgcolor,color:theme[themeName].button_text}} key={i} 
                    onClick={() => buttonClick(x + 1)}
                    >Button {x+1}</button>
                )
            }
            </div>
        </div>
        
        <div  style={{
            width:'50%',
           backgroundColor: theme[themeName].right_bgcolor,
           color:theme[themeName].right_text_color,
        }}>
             {actionList}
        </div>
      </div>
    );

}
