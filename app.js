    const userAPIUrl = 'https://630a60c53249910032851917.mockapi.io/users'
    const formElement = document.querySelector('#form')
    const nameInput = document.querySelector('#input-name')
    const phoneInput = document.querySelector('#input-phone')
    const loaderElement = document.querySelector('#loader')
    const showLoader = () => {
      loaderElement.style.display = 'block'
    }
    const hideLoader = () => {
      loaderElement.style.display = 'none'
    }
    const loadUserList = () => {
      showLoader()
      const handleData = (users) => {
        const userListElement = document.querySelector('#users')
        const userNames = users.map(user => `
          <div class="user-item">
            <p>${user.name}</p>
            <p>${user.phone}</p>
            <button id="delete-button-${user.id}" class="delete-button">x</button>
          </div>          
        `)

        if (users.length > 0) {
          userListElement.innerHTML = userNames.join('')
          
          const deleteButtons = document.querySelectorAll('.delete-button')
          deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
              const userId = button.id.replace('delete-button-', '')
              deleteUser(userId)
            })
          })
        } else {
          userListElement.innerHTML = 'Nenhum telefone cadastrado...'
        }
      }

      fetch(userAPIUrl).then((response) => {
        hideLoader()
        response.json().then(handleData)
      }).catch((e) => {
         console.log(e) 
      })
    }

    const createUser =  (newUser) => {
      showLoader()
      fetch(userAPIUrl, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
      }).then(() => {
        hideLoader()
        loadUserList()
      })
    }

    const deleteUser =  (userId) => {
      fetch(userAPIUrl + '/' + userId, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json; charset=UTF-8'}
      }).then(() => {
        loadUserList()
      })
    }

    loadUserList()

    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      const newUser = {
        name: nameInput.value,
        phone: phoneInput.value
      }
      nameInput.value = ''
      phoneInput.value = ''

      createUser(newUser)
    })
