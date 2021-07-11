const get = (elem) => document.querySelector(elem)
const messageList = document.getElementById('messages-list')
const chatsList = document.getElementById('chats-list')
const input = document.getElementById('message-input')
const messageForm = document.querySelector('.send-msg-form')

const myNameOutput = document.querySelector('.my-name-h1')


let targetedChat = 0;

let localData = JSON.parse(localStorage.getItem('MYDATA'))

let data = (localStorage.getItem('MYDATA')) ? localData : {
    config: {
        background: 'red',
        myName: 'Usmonxon',
        myOldNames: [],
        myProfilePhoto: 'https://via.placeholder.com/150'
    },
    chats: [{
            chatId: 1,
            chatName: 'MuhammadYunus',
            profileImg: 'https://cdn4.telesco.pe/file/fpusVLuPhg3KN1O_40Au_abST1KrubyJGxZEcMlhJ9iusVKq2qA5zCl985000FcwCiy54mvnVH6GvKKbn3DDfZQslA8i3H5h6ElL1xXgUWtL7FCpVmtP9tXK0mSn3pW8PZcjh__XgObev0Hxr4XnsDi6d6H-t_LXijyunsvkIm1zfx4MmmEitO0mMU22czMPvCfO_MkRtfvtY2jpKkl68CI9qOA3djgYc05MPOQatndHU62WJxue7yAWKDvCLsMj0dBfzVf481bJGQwGQwWxTuuvpxHiBr2suMSV7oeR0Slx9WeV66YuTYJTPwrPa8CRaIKDLiKikwpRp8eichMDvA.jpg',
            chatNumber: '+998 99 142-34-71',
            chatMessages: [{
                sender: 'Muhammad Yunus',
                message: 'Imtihon vaqti ohiriga yetdi, vazifani tashen',
                messageTime: '22:56'
            }]
        }, {
            chatId: 2,
            chatName: 'Jamoliddin Aka',
            profileImg: 'https://cdn4.telesco.pe/file/IAn1MKEUeeZ3JcD3GuR1KjgvAZCAqc7sWOUV6fqGjmiCyqfiw4vvVNSCcEI7lTqp4y0zsUFWDoTpEN_PcO4xlOQVO0qu1BzHf4KoiN4iYFKI777MGSjSko6n6Os14UqolYu23wKamvKZ08GcuxqZ4FdLf2D2Ra2w2DilzLyAgGhkSgECtklqK-HCKKdLFvGuQmFiKbnMftSfAbHgxmco0WXvsfqT7ViBIrIOmj24WhJShyJO9EHxW60JJZ2Io-Pjn-Kf-giC2UzwB929RMK_mKF1X9-n1ahLEyeIIazncSIGsvpsYc0-U6gYYaprwmSVTTztqN6748VZbDzOXrnbmw.jpg',
            chatNumber: '+998 97 105-15-60',
            chatMessages: [{
                sender: 'Jamoliddin Aka',
                message: 'Assalomu Alaykum Ukam',
                messageTime: '7:15'
            }
        ]
        },

        {
            chatId: 3,
            chatName: 'Farrux',
            profileImg: 'https://cdn4.telesco.pe/file/uro3Dve8hwjm6EvHkVzs54wHOXzE1RGoMF9y0UJxnD6m5qP18k67pdVsIQQ60rG7NqPTV7MR7GKGHkmZn1fxunoBfpAZCJt0q_tXQ7os9vX5FrsMvLGg0FPvRszzE4icW3vtHRh3UXKV7CjjHIPx7wF51r7yph7ONSg8MVf9EnO3tgHS2mzxPIDa8LEVPhOG0HYPnUlYDM-Z1exAfr9-9qCrBpCOpIsuZuzzpUPhi_NOuN4nM5FkLFQft6BfjQOGG66-BT5z36yN1CBQQlJ-agNhIXFD1Hn5FeaCJSBEbKTIXL31aL2wVMonqMXsc5tIjU7DugcqyqUlskHgvitIkg.jpg',
            chatNumber: '+998 99 333-33-33',
            chatMessages: []
        },
        {
            chatId: 4,
            chatName: 'Sarvarbek',
            profileImg: 'https://picsum.photos/100?random=6',
            chatNumber: '+998 99 333-33-33',
            chatMessages: []
        }
    ]
}


console.log(localData);

localStorage.setItem('MYDATA', JSON.stringify(data))

renderChatAll()

renderNeededChatMsg()


function renderMessage(message, messageTime, msgSender) {
    const liElement = document.createElement('li')
    const messageElement = document.createElement('p')
    const messageTimeElement = document.createElement('p')
    messageElement.textContent = message
    messageTimeElement.textContent = messageTime
    messageElement.classList.add('message-text')
    messageTimeElement.classList.add('message-time')
    liElement.appendChild(messageElement)
    liElement.appendChild(messageTimeElement)
    liElement.classList.add('message')

    if (msgSender != data.config.myName) {
        liElement.classList.add('message-received')
    }

    return liElement

}

function renderChat(chatName, chatProfileImage, ID) {
    const liElement = document.createElement('li')
    const buttonElement = document.createElement('button')
    const imageElement = document.createElement('img')
    const divElement = document.createElement('div')
    const h4Element = document.createElement('h4')
    const lastMsgTime = document.createElement('p')
    buttonElement.type = 'button'
    buttonElement.classList.add('chat-item')
    imageElement.src = chatProfileImage
    imageElement.alt = "Profile Photo"
    imageElement.width = 70
    imageElement.height = 70
    divElement.classList.add('righter-chat-item')
    h4Element.classList.add('chat-name')
    h4Element.textContent = chatName
    lastMsgTime.classList.add('last-message-time')
    divElement.appendChild(h4Element)
    divElement.appendChild(lastMsgTime)
    buttonElement.appendChild(imageElement)
    buttonElement.appendChild(divElement)
    liElement.appendChild(buttonElement)
    buttonElement.dataset.chatIdentifity = ID;

    return liElement
}

messageForm.addEventListener('submit', event => {
    event.preventDefault()

    const mydate = new Date()

    data.chats[targetedChat].chatMessages.push({
        sender: data.config.myName,
        message: input.value,
        messageTime: `${mydate.getHours()}:${mydate.getMinutes()}`
    })
    localStorage.setItem('MYDATA', JSON.stringify(data))

    renderNeededChatMsg()
    messageForm.reset()
})

makeActive()

function makeActive() {
    const chatItem = document.querySelectorAll('.chat-item')

    chatItem.forEach((elem, index) => elem.addEventListener('click', event => {
        chatItem.forEach(em => em.classList.remove('chat-item-active'))
    
        targetedChat = index
    
        elem.classList.add('chat-item-active')
    
        messageList.innerHTML = ""
    
        renderNeededChatMsg()
        setTopChatInfo()
    }))
}

function renderNeededChatMsg() {
    messageList.innerHTML = ""

    for (let msg of data.chats[targetedChat].chatMessages) {
        messageList.appendChild(renderMessage(msg.message, msg.messageTime, msg.sender))
    }
}

function renderChatAll() {
    chatsList.innerHTML = ""
    for (let contact of data.chats) {
        chatsList.appendChild(renderChat(contact.chatName, contact.profileImg, contact.chatId))
    }
}

function setTopChatInfo() {
    const chatProfileImg = document.querySelector('.chat-profile-img')
    const chatProfileName = document.querySelector('.chat-profile-name')

    chatProfileImg.src = data.chats[targetedChat].profileImg
    chatProfileName.textContent = data.chats[targetedChat].chatName

}

//MODALS AND SETTINGS

const settingsButton = document.querySelector('.hamburger')
const settings = document.querySelector('.settings')
const parentMessages = document.querySelector('.parent-messages')
const sidebar = document.querySelector('.sidebar')
const contactButton = document.querySelector('#contact-button')
const contactAddScreen = document.querySelector('.add-contact')
const removeAddContact = document.querySelector('.remove-add-contact')


const addConactForm = document.querySelector('.add-conact-form')

const contactNameInput = document.querySelector('#contact-name-input')
const contactImageInput = document.querySelector('#contact-image-input')
const contactNumberInput = document.querySelector('#contact-number-input')

removeAddContact.addEventListener('click', event =>{
    contactAddScreen.classList.remove('add-contact-active')
})

settingsButton.addEventListener('click', event =>{
    settings.classList.toggle('settings-active')
    parentMessages.addEventListener('mouseover', event =>{
        settings.classList.remove('settings-active')
    })
})

contactButton.addEventListener('click', event =>{
    contactAddScreen.classList.add('add-contact-active')
    settings.classList.remove('settings-active')
})

addConactForm.addEventListener('submit', event =>{
    event.preventDefault()

    let nowdate = new Date()

    data.chats.push({
        chatId: data.chats[data.chats.length-1].chatId -0 + 1,
        chatName: contactNameInput.value,
        profileImg: contactImageInput.value,
        chatNumber: contactNumberInput.value,
        chatMessages: [{
            sender: contactNameInput.value,
            message: 'Salom',
            messageTime: `${nowdate.getHours()}:${nowdate.getMinutes()}`
        }]
    })

    localStorage.setItem('MYDATA', JSON.stringify(data))
    renderChatAll()
    renderNeededChatMsg()
    makeActive()

    contactAddScreen.classList.remove('add-contact-active')
    addConactForm.reset()
})
