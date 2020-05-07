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
            messageone.textContent =(data.location)
             messagetwo.textContent=(data.temperature)
         }
             
         })
})
    
})
