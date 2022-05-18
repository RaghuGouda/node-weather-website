const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value

    messageOne.textContent = 'loading ....'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
        response.json().then((resultData)=>{
            if(resultData.err){
                console.log(resultData.error)
                messageOne.textContent = resultData.err
            }
            else{
                console.log(resultData)
                console.log(resultData.address)
                console.log(resultData.forecast)
                messageOne.textContent = resultData.address
                messageTwo.textContent = resultData.forecast

            }
        })
    })
})