console.log('Client side javascript file is loaded!')


const weatherform=document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#messageone')
const messagetwo = document.querySelector('#messagetwo')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
      
        const address=search.value.toString()
        messageone.textContent = 'Loading'
        messagetwo.textContent = ''

        fetch('/weather?address='+address).then((response)=>{
         response.json().then((data)=>
         {   if(data.error){
             messageone.textContent = data.error

         }
         else{
            messageone.textContent ="The requested place is "+data.location
             messagetwo.textContent="The overal weather summary of the place is "+data.summary+".The temperature is "+data.temperature+" degree Farenheit.Which feels like "+data.feelslike+" Degree Farenheit.The probability of getting rain is "+data.precipitation+" with cloud cover of "+data.cloudcover+" percentage.The uv_index is "+data.uv_index+" and visibility in the place is "+data.visibility
         }
             
         })
})
    
})
