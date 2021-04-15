const root = document.getElementById('root')

fetch('/api/v1/auth/verify')
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('Not Logged In')
    })
    .then(({ username, photoUrl }) => {
        const name = document.createElement('h3')
        const image = document.createElement('img')
        image.style.width = '150px'
        image.style.borderRadius = '50%'
        image.src = photoUrl
        name.textContent = username;
        root.append(image, name)
    })
    .catch((err) => {
        console.error(err)

        const loginButton = document.createElement('button')
        loginButton.textContent = 'Login with GitHub'
        loginButton.addEventListener('click', () => window.location.href = '/api/v1/auth/login')

        root.append(loginButton)
    })

